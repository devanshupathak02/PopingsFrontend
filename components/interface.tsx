"use client"

import { useState } from "react"
import ImageUploader from "./image-uploader"
import ImageProcessor from "./image-processor"

export default function Interface() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)

  return (
    <main className="w-full min-h-screen py-32 px-8 overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto">
        {!originalImage ? (
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Remove Backgrounds
                <br />
                <span className="text-4xl md:text-6xl">Instantly with AI</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Professional-grade background removal powered by advanced AI. Perfect for e-commerce, portraits, and
                creative projects.
              </p>
            </div>
            <ImageUploader onImageSelect={setOriginalImage} />
          </div>
        ) : (
          <ImageProcessor
            originalImage={originalImage}
            processedImage={processedImage}
            onProcessedImage={setProcessedImage}
            onReset={() => {
              setOriginalImage(null)
              setProcessedImage(null)
            }}
          />
        )}
      </div>
    </main>
  )
}
