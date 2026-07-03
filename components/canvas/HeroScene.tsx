"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette, BrightnessContrast } from "@react-three/postprocessing";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// A Julia-set fractal rendered on a flat, circularly-masked plane. The mask
// and coloring both use smoothstep so the circle edge and tonal bands stay
// anti-aliased instead of hard-stepped or pixelated. The fractal math below
// (iteration, escape test, smooth coloring) is unchanged from the original —
// only the tone-mapping / simulated-lighting layer was reworked.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_zoom;
  varying vec2 vUv;

  // Layered, simulated lighting: a soft directional key bias, a rim
  // brightening near the mask edge, and a weak ambient floor so nothing
  // ever crushes to pure black or blows out to pure white.
  vec3 tone(float t, vec2 uv, float dist) {
    vec3 c1 = vec3(0.025);
    vec3 c2 = vec3(0.3);
    vec3 c3 = vec3(0.6);
    vec3 c4 = vec3(0.82);
    vec3 col = mix(c1, c2, smoothstep(0.0, 0.32, t));
    col = mix(col, c3, smoothstep(0.32, 0.66, t));
    col = mix(col, c4, smoothstep(0.66, 1.0, t));

    float key = smoothstep(0.6, -0.6, uv.x + uv.y) * 0.025;
    float rim = smoothstep(0.34, 0.5, dist) * 0.08;
    col += key + rim;
    col = max(col, vec3(0.012));

    return col;
  }

  void main() {
    vec2 uv = vUv - 0.5;

    float dist = length(uv);
    float mask = 1.0 - smoothstep(0.44, 0.5, dist);
    if (mask <= 0.001) {
      discard;
    }

    vec2 z = uv * u_zoom;

    // Dragon-Julia base constant, drifting slowly on its own and nudged by
    // the smoothed pointer — small perturbations are deliberate, Julia sets
    // are sensitive enough that anything larger dissolves into noise.
    vec2 c = vec2(-0.8, 0.156);
    c += vec2(cos(u_time * 0.045), sin(u_time * 0.037)) * 0.015;
    c += u_mouse * 0.026;

    const float maxIter = 80.0;
    float iter = maxIter;
    for (float i = 0.0; i < maxIter; i++) {
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
      if (dot(z, z) > 4.0) {
        iter = i;
        break;
      }
    }

    float smoothIter = iter;
    if (iter < maxIter) {
      float logZn = log(dot(z, z)) * 0.5;
      float nu = log(logZn / log(2.0)) / log(2.0);
      smoothIter = iter + 1.0 - nu;
    }

    float t = clamp(smoothIter / maxIter, 0.0, 1.0);
    vec3 color = tone(t, uv, dist);

    gl_FragColor = vec4(color, mask * 0.92);
  }
`;

interface FractalDiscProps {
  isMobile: boolean;
}

function FractalDisc({ isMobile }: FractalDiscProps) {
  const { gl, camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Tracked manually via a window-level listener + getBoundingClientRect,
  // rather than R3F's built-in state.pointer — that value is derived from
  // the browser's native offsetX/offsetY, which several embedded/automated
  // contexts (and any synthetically dispatched event) never populate.
  // clientX/clientY are always reliable, so this path is more robust.
  const rawPointer = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const targetPointer = useRef(new THREE.Vector2(0, 0));
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));
  const zoom = useRef(2.6);
  const cameraBase = useRef(new THREE.Vector3(0, 0, 0));

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_zoom: { value: 2.6 },
    }),
    []
  );

  useEffect(() => {
    cameraBase.current.copy(camera.position);
  }, [camera]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      rawPointer.current.x = e.clientX;
      rawPointer.current.y = e.clientY;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    const t = clock.elapsedTime;

    const rect = gl.domElement.getBoundingClientRect();
    const ndcX = ((rawPointer.current.x - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((rawPointer.current.y - rect.top) / rect.height) * 2 - 1);
    targetPointer.current.set(
      THREE.MathUtils.clamp(ndcX, -1.5, 1.5),
      THREE.MathUtils.clamp(ndcY, -1.5, 1.5)
    );

    // Lerp toward the raw pointer for fluid inertia rather than a 1:1 snap.
    smoothedMouse.current.lerp(targetPointer.current, 0.06);

    const velocity = smoothedMouse.current.distanceTo(prevMouse.current);
    prevMouse.current.copy(smoothedMouse.current);

    const targetZoom = 2.6 - Math.min(velocity * 8, 0.3);
    zoom.current = THREE.MathUtils.lerp(zoom.current, targetZoom, 0.08);

    const material = materialRef.current;
    if (material) {
      material.uniforms.u_time.value = t;
      material.uniforms.u_mouse.value.copy(smoothedMouse.current);
      material.uniforms.u_zoom.value = zoom.current;
    }

    // Heavy, weighted tilt toward the pointer — slow lerp reads as mass
    // rather than a snappy UI response. Idle drift layers a slow Lissajous
    // wobble and a breathing bob on top, so the piece never sits inert.
    const tiltStrength = isMobile ? 0.05 : 0.1;
    const idleTiltX = Math.sin(t * 0.11) * 0.035;
    const idleTiltY = Math.cos(t * 0.08) * 0.045;
    const group = groupRef.current;
    if (group) {
      const targetRotX = smoothedMouse.current.y * tiltStrength + idleTiltX;
      const targetRotY = smoothedMouse.current.x * tiltStrength + idleTiltY;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.025);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.025);
      group.rotation.z = t * 0.006;
      group.position.y = -0.1 + Math.sin(t * 0.15) * 0.09;
    }

    // Subtle camera parallax + a near-imperceptible idle orbital sway —
    // premium sites lean on slow camera movement more than object spin.
    const parallaxStrength = isMobile ? 0.04 : 0.1;
    const orbitX = Math.sin(t * 0.05) * 0.05;
    const orbitY = Math.cos(t * 0.04) * 0.03;
    const targetCamX = cameraBase.current.x + smoothedMouse.current.x * parallaxStrength + orbitX;
    const targetCamY = cameraBase.current.y + smoothedMouse.current.y * parallaxStrength * 0.6 + orbitY;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.02);
    // Look at a point near the world origin (roughly the composition's
    // center), not at the object itself — panning toward the object would
    // recenter it in frame every time the camera drifts, defeating the
    // off-to-the-side crop this composition depends on.
    camera.lookAt(orbitX * 0.4, orbitY * 0.4, 0);
  });

  const scale = isMobile ? 1.6 : 3.6;
  const position: [number, number, number] = isMobile
    ? [1.0, 0.3, -0.9]
    : [2.05, 0.1, -0.8];

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <planeGeometry args={[scale, scale]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <FractalDisc isMobile={isMobile} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={isMobile ? 0.08 : 0.12}
          luminanceThreshold={0.82}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <BrightnessContrast brightness={0} contrast={0.07} />
        <Vignette eskil={false} offset={0.25} darkness={isMobile ? 0.45 : 0.6} />
      </EffectComposer>
    </Canvas>
  );
}
