"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import type { Mesh, Group } from "three"
import ParticleField from "./particle-field"
import GeometricShapes from "./geometric-shapes"

export default function Scene() {
  const mainGroupRef = useRef<Group>(null)
  const sphereRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={mainGroupRef}>
      {/* Subtle Lighting */}
      <ambientLight intensity={0.1} color="#1a1a2e" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
      <pointLight position={[10, -10, -5]} intensity={1} color="#8b5cf6" />

      {/* Background Particles */}
      <ParticleField />

      {/* Geometric Shapes */}
      <GeometricShapes />

      {/* Central Distorted Sphere */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} position={[0, 0, -20]} args={[3, 64, 64]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            emissive="#1e40af"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
    </group>
  )
}
