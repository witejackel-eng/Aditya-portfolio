"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function NoiseSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const { pointer, clock } = state;
    if (groupRef.current) {
      const targetX = pointer.y * 0.22;
      const targetY = pointer.x * 0.28;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.04
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY + clock.elapsedTime * 0.05,
        0.04
      );
    }
    if (knotRef.current) {
      knotRef.current.rotation.y -= delta * 0.06;
      knotRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[1.3, -0.1, -1]}>
      <Sphere args={[0.95, 128, 128]}>
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
      <mesh ref={knotRef} scale={0.62}>
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
      camera={{ position: [0, 0, 4.6], fov: 35 }}
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
