"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
// anti-aliased instead of hard-stepped or pixelated.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_zoom;
  varying vec2 vUv;

  vec3 tone(float t) {
    vec3 c1 = vec3(0.02);
    vec3 c2 = vec3(0.38);
    vec3 c3 = vec3(0.80);
    vec3 c4 = vec3(1.0);
    vec3 col = mix(c1, c2, smoothstep(0.0, 0.32, t));
    col = mix(col, c3, smoothstep(0.32, 0.66, t));
    col = mix(col, c4, smoothstep(0.66, 1.0, t));
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
    vec3 color = tone(t);

    gl_FragColor = vec4(color, mask * 0.92);
  }
`;

function FractalDisc() {
  const { gl } = useThree();
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

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_zoom: { value: 2.6 },
    }),
    []
  );

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
      material.uniforms.u_time.value = clock.elapsedTime;
      material.uniforms.u_mouse.value.copy(smoothedMouse.current);
      material.uniforms.u_zoom.value = zoom.current;
    }
  });

  return (
    <mesh position={[1.3, -0.1, -1]}>
      <planeGeometry args={[2.6, 2.6]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <FractalDisc />
    </Canvas>
  );
}
