"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial } from "@react-three/drei"
import type { Mesh } from "three"

export default function FloatingCrystals() {
  const crystals = useRef<Mesh[]>([])

  useFrame((state) => {
    crystals.current.forEach((crystal, index) => {
      if (crystal) {
        crystal.rotation.x = state.clock.elapsedTime * (0.3 + index * 0.1)
        crystal.rotation.y = state.clock.elapsedTime * (0.2 + index * 0.05)
        crystal.rotation.z = state.clock.elapsedTime * (0.1 + index * 0.03)
      }
    })
  })

  const crystalPositions = [
    [-8, 3, -6],
    [8, -2, -4],
    [-5, -4, -8],
    [6, 5, -3],
    [-3, 6, -7],
    [4, -3, -5],
  ]

  return (
    <>
      {crystalPositions.map((position, i) => (
        <Float key={i} speed={0.8 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
          <mesh
            ref={(el) => el && (crystals.current[i] = el)}
            position={position as [number, number, number]}
            scale={[0.8 + i * 0.2, 1.5 + i * 0.3, 0.8 + i * 0.2]}
          >
            <octahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial
              color={`hsl(${200 + i * 30}, 70%, 50%)`}
              thickness={0.5}
              roughness={0.1}
              transmission={0.9}
              ior={1.5}
              chromaticAberration={0.1}
              backside
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}
