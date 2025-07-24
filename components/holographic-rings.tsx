"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type { Mesh } from "three"
import * as THREE from "three"

export default function HolographicRings() {
  const rings = useRef<Mesh[]>([])

  useFrame((state) => {
    rings.current.forEach((ring, index) => {
      if (ring) {
        ring.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1)
        ring.rotation.z = state.clock.elapsedTime * (0.3 + index * 0.05)
        ring.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2
      }
    })
  })

  return (
    <>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            ref={(el) => el && (rings.current[i] = el)}
            position={[Math.sin(i * 0.8) * 12, Math.cos(i * 0.6) * 8, Math.sin(i * 0.4) * -10]}
          >
            <torusGeometry args={[2 + i * 0.5, 0.1, 8, 64]} />
            <meshStandardMaterial
              color={`hsl(${280 + i * 20}, 80%, 60%)`}
              transparent
              opacity={0.4}
              emissive={`hsl(${280 + i * 20}, 80%, 30%)`}
              emissiveIntensity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}
