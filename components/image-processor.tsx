"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Download, RotateCcw, Zap, CheckCircle, Loader2 } from "lucide-react"

interface ImageProcessorProps {
  originalImage: File | null
  processedImage: string | null
  onProcessedImage: (image: string) => void
  onReset: () => void
}

export default function ImageProcessor({
  originalImage,
  processedImage,
  onProcessedImage,
  onReset,
}: ImageProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState("")

  const processImage = useCallback(async () => {
    if (!originalImage) return;
    setIsProcessing(true)
    setProcessingStep("")
    try {
      setProcessingStep("Uploading image to AI backend...")
      const formData = new FormData()
      formData.append("file", originalImage)

      setProcessingStep("AI processing background...")
      const apiRes = await fetch("https://backgroundremover-pld3.onrender.com/segment", {
        method: "POST",
        body: formData,
      })
      if (!apiRes.ok) throw new Error("Segmentation failed")
      setProcessingStep("Downloading result...")
      const resultBlob = await apiRes.blob()
      const resultUrl = URL.createObjectURL(resultBlob)
      onProcessedImage(resultUrl)
      setProcessingStep("")
    } catch (err: any) {
      setProcessingStep("Error: " + (err.message || "Unknown error"))
    } finally {
      setIsProcessing(false)
    }
  }, [originalImage, onProcessedImage])

  const downloadImage = useCallback(() => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.download = "popping-background-removed.png"
    link.href = processedImage
    link.click()
  }, [processedImage])

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">AI Background Removal</h2>
        <p className="text-gray-400 text-base md:text-lg">Professional results in seconds</p>
      </div>

      {/* Image Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Original Image */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="text-lg md:text-xl font-semibold text-white">Original</h3>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-sm">
              <img
                src={originalImage ? URL.createObjectURL(originalImage as File) : "/placeholder.svg"}
                alt="Original"
                className="w-full h-auto max-h-80 md:max-h-96 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Processed Image */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${processedImage ? "bg-green-500" : "bg-gray-500"}`}></div>
            <h3 className="text-lg md:text-xl font-semibold text-white">AI Processed</h3>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-sm min-h-80 md:min-h-96 flex items-center justify-center">
              {isProcessing ? (
                <div className="text-center space-y-4 p-6 md:p-8">
                  <div className="relative">
                    <Loader2 className="w-10 md:w-12 h-10 md:h-12 text-blue-500 animate-spin mx-auto" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base md:text-lg mb-2">Processing...</p>
                    <p className="text-gray-400 text-sm">{processingStep}</p>
                  </div>
                </div>
              ) : processedImage ? (
                <img
                  src={processedImage || "/placeholder.svg"}
                  alt="Processed"
                  className="w-full h-auto max-h-80 md:max-h-96 object-contain"
                />
              ) : (
                <div className="text-center p-6 md:p-8">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 md:w-8 h-6 md:h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-base md:text-lg">Ready to process</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {!processedImage && !isProcessing && (
          <Button
            onClick={processImage}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Zap className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
            Remove Background
          </Button>
        )}

        {processedImage && (
          <>
            <Button
              onClick={downloadImage}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
              Download Result
            </Button>

            <Button
              onClick={onReset}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 bg-transparent"
            >
              <RotateCcw className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
              Process Another
            </Button>
          </>
        )}
      </div>

      {/* Success Message */}
      {processedImage && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-400 font-medium">Background removed successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}
