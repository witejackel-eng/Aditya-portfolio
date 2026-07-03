"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Swipe-to-spin tuning: an impulse-and-decay model (not a spring-to-target)
// so a flick keeps free-spinning and eases out on its own, the way a real
// object with momentum would — never snapping to a fixed end rotation.
const SWIPE_IMPULSE = 18;
const SPIN_DECAY = 0.9;
const MAX_SPIN_VELOCITY = 12;

function NoiseSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const spinVelocity = useRef(0);
  const spinOffset = useRef(0);
  const lastPointerX = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "grab" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (lastPointerX.current !== null) {
      const deltaX = e.pointer.x - lastPointerX.current;
      // Only a right-to-left swipe (negative X velocity) feeds the spin.
      if (deltaX < 0) {
        spinVelocity.current = Math.min(
          MAX_SPIN_VELOCITY,
          spinVelocity.current + Math.abs(deltaX) * SWIPE_IMPULSE
        );
      }
    }
    lastPointerX.current = e.pointer.x;
  };

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => {
    setHovered(false);
    lastPointerX.current = null;
  };

  useFrame((state, delta) => {
    const { pointer, clock } = state;

    spinOffset.current += spinVelocity.current * delta;
    spinVelocity.current *= Math.pow(SPIN_DECAY, delta * 60);

    if (groupRef.current) {
      const targetTiltX = pointer.y * 0.18;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        0.04
      );
      groupRef.current.rotation.y = clock.elapsedTime * 0.05 + spinOffset.current;
    }
    if (knotRef.current) {
      knotRef.current.rotation.y -= delta * 0.06;
      knotRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <Sphere
        args={[1.05, 96, 96]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerMove={handlePointerMove}
      >
        <MeshDistortMaterial
          color="#0f0f0e"
          distort={0.4}
          speed={1.2}
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.55}
        />
      </Sphere>
      <mesh ref={knotRef} scale={0.58}>
        <torusKnotGeometry args={[1.4, 0.32, 220, 24]} />
        <meshBasicMaterial color="#f5f5f5" wireframe transparent opacity={0.09} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.8], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 3, 4]} intensity={1.6} />
      <pointLight position={[-4, -2, -3]} intensity={0.3} color="#ffffff" />
      <NoiseSphere />
    </Canvas>
  );
}
