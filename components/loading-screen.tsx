"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center z-50">
      <div className="text-center relative">
        {/* Animated Background Elements */}
        <div className="absolute -inset-20 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main Loading Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto"></div>
          <div
            className="absolute inset-0 w-32 h-32 border-4 border-cyan-400/30 border-b-cyan-400 rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
          <div
            className="absolute inset-4 w-24 h-24 border-2 border-pink-400/50 border-r-pink-400 rounded-full animate-spin mx-auto"
            style={{ animationDuration: "0.8s" }}
          ></div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          POPPING
        </h1>
        <p className="text-cyan-300 text-xl mb-6">AI Background Remover</p>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-gray-800 rounded-full mx-auto mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-purple-300 text-sm">{Math.round(progress)}% Loading...</p>
      </div>
    </div>
  )
}
