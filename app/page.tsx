"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import Scene from "@/components/scene"
import Interface from "@/components/interface"
import Header from "@/components/header"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 20, 100]} />

            <Environment preset="night" />

            <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} autoRotate autoRotateSpeed={0.2} />

            <Scene />

            <EffectComposer>
              <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
              <ChromaticAberration offset={[0.001, 0.001]} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* UI Layer */}
      <div className="relative z-10 w-full">
        <Header />
        <Interface />
      </div>
    </div>
  )
}
