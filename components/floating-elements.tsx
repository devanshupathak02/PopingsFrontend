"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Sphere, Box, Octahedron } from "@react-three/drei"
import type { Mesh } from "three"

export default function FloatingElements() {
  const elements = useRef<Mesh[]>([])

  useFrame((state) => {
    elements.current.forEach((element, index) => {
      if (element) {
        element.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1)
        element.rotation.y = state.clock.elapsedTime * (0.3 + index * 0.05)
      }
    })
  })

  return (
    <>
      {/* Floating spheres */}
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={(el) => el && (elements.current[0] = el)} position={[-6, 2, -3]} args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#ff6b6b" transparent opacity={0.7} />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Box ref={(el) => el && (elements.current[1] = el)} position={[6, 1, -2]} args={[1, 1, 1]}>
          <meshStandardMaterial color="#4ecdc4" transparent opacity={0.6} />
        </Box>
      </Float>

      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={2.5}>
        <Octahedron ref={(el) => el && (elements.current[2] = el)} position={[-4, -2, -4]} args={[0.8]}>
          <meshStandardMaterial color="#a855f7" transparent opacity={0.8} />
        </Octahedron>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.8}>
        <Sphere ref={(el) => el && (elements.current[3] = el)} position={[5, -1.5, -3]} args={[0.3, 16, 16]}>
          <meshStandardMaterial color="#ffd93d" transparent opacity={0.9} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <Box ref={(el) => el && (elements.current[4] = el)} position={[-2, 4, -5]} args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial color="#6c5ce7" transparent opacity={0.5} />
        </Box>
      </Float>
    </>
  )
}
