'use client'

import { useState, useRef } from 'react'
import { RecipeAPI } from '../../lib/api'

interface ImageUploaderProps {
  onImageAnalyzed: (ingredients: string[]) => void
}

export default function ImageUploader({ onImageAnalyzed }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file.')
    }
  }

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  // Convert file to base64 for API
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // Remove data:image/jpeg;base64, prefix
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
    })
  }

  // Handle image analysis
  const handleAnalyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    try {
      const base64Image = await fileToBase64(selectedImage)
      
      // Call the real API endpoint
      const ingredients = await RecipeAPI.analyzeImage(base64Image)
      
      // Pass the ingredients back to the parent component
      onImageAnalyzed(ingredients)
      
    } catch (error) {
      console.error('Error analyzing image:', error)
      alert('Failed to analyze image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Reset component
  const handleReset = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!selectedImage && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
        >
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📷</div>
            <p className="text-lg font-medium text-gray-700">
              Upload Food Image
            </p>
            <p className="text-sm text-gray-500">
              Drag & drop an image or click to browse
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && imagePreview && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Uploaded food"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none"
            >
              ×
            </button>
          </div>
          
          <button
            onClick={handleAnalyzeImage}
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing Ingredients...</span>
              </div>
            ) : (
              'Analyze Ingredients'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
