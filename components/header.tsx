"use client"

import { Zap } from "lucide-react"

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              POPPING
            </h1>
            <p className="text-gray-400 text-sm font-medium">AI Background Remover</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            API
          </a>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  )
}
