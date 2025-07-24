"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onImageSelect: (file: File) => void
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file); // Pass the File, not a string!
      }
    },
    [onImageSelect],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300",
          isDragOver
            ? "border-blue-400 bg-blue-500/5 scale-105"
            : "border-gray-600 bg-gray-900/20 hover:border-gray-500",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>

        <div className="relative flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center border border-gray-600">
              <Upload className="w-8 md:w-10 h-8 md:h-10 text-gray-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">Upload Your Image</h3>
            <p className="text-gray-400 text-base md:text-lg">Drag and drop your image here, or click to browse</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, WebP • Max 10MB</p>

            <Button
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ImageIcon className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
              Choose Image
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileSelect(file)
            }}
          />
        </div>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {["AI-Powered", "High Quality", "Instant Results", "Professional Grade"].map((feature) => (
          <div
            key={feature}
            className="px-3 md:px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-xs md:text-sm font-medium"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}
