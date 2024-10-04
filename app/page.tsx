"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Maximize2, Download } from "lucide-react"
import { removeBackground } from "@/actions/removeBackground"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const fullScreenImageRef = useRef<HTMLImageElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setProcessedImage(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (!selectedImage) return

    setIsProcessing(true)
    setError(null)

    try {
      const result = await removeBackground(selectedImage)
      setProcessedImage(result as string)
    } catch (error: unknown | Error) {
      console.error('Error processing image:', error)
      if (error instanceof Error) {
        setError(`Failed to remove background: ${error.message}`)
      } else {
        setError('Failed to remove background: An unknown error occurred')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const downloadImage = async () => {
    if (processedImage) {
      try {
        const response = await fetch(processedImage)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'processed_image.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error downloading image:', error)
        setError('Failed to download the image. Please try again.')
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        toggleFullScreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullScreen])

  return (
    <div className="flex flex-col min-h-[90vh]">
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Image Upload */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full h-auto rounded-md"
                  />
                  <Button
                    onClick={processImage}
                    className="mt-4"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Removing Background...
                      </>
                    ) : (
                      "Remove Background"
                    )}
                  </Button>
                </div>
              )}
              {error && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
            </CardContent>
          </Card>

          {/* Right side - Processed Image */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
              {processedImage ? (
                <div className="relative">
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="max-w-full h-auto"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button onClick={toggleFullScreen} size="sm">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button onClick={downloadImage} size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Processed image will appear here
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Full Screen Image Modal */}
      {isFullScreen && processedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={toggleFullScreen}
        >
          <img
            ref={fullScreenImageRef}
            src={processedImage}
            alt="Full Screen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}