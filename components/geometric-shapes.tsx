"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type { Mesh } from "three"

export default function GeometricShapes() {
  const shapes = useRef<Mesh[]>([])

  useFrame((state) => {
    shapes.current.forEach((shape, index) => {
      if (shape) {
        shape.rotation.x = state.clock.elapsedTime * (0.2 + index * 0.05)
        shape.rotation.y = state.clock.elapsedTime * (0.1 + index * 0.03)
      }
    })
  })

  const positions = [
    [-15, 10, -25],
    [15, -8, -30],
    [-20, -5, -35],
    [18, 12, -28],
  ]

  return (
    <>
      {positions.map((position, i) => (
        <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={1}>
          <mesh ref={(el) => el && (shapes.current[i] = el)} position={position as [number, number, number]}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
              metalness={0.8}
              roughness={0.2}
              emissive={i % 2 === 0 ? "#1e40af" : "#6d28d9"}
              emissiveIntensity={0.1}
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}
