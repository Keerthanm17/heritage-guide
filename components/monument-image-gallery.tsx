"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Download, Share2, Play, Pause, RotateCcw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMonumentImages } from "@/hooks/use-monument-images"

interface MonumentImageGalleryProps {
  monumentName: string
  monumentId: string
}

export function MonumentImageGallery({ monumentName, monumentId }: MonumentImageGalleryProps) {
  const { images, loading, error, hasMore, loadMore, refetch, debug } = useMonumentImages(monumentName)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlay, images.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handleImageError = (imageId: string) => {
    setImageLoadErrors((prev) => new Set([...prev, imageId]))
  }

  const handleImageLoad = (imageId: string) => {
    setImageLoadErrors((prev) => {
      const newSet = new Set(prev)
      newSet.delete(imageId)
      return newSet
    })
  }

  const handleShare = async (image: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.description,
          text: `Check out this image of ${monumentName}`,
          url: image.originalUrl || image.url,
        })
      } catch (err) {
        console.log("Share cancelled or failed")
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(image.originalUrl || image.url)
        alert("Image URL copied to clipboard!")
      } catch (err) {
        console.error("Failed to copy URL")
      }
    }
  }

  const handleDownload = (image: any) => {
    const link = document.createElement("a")
    link.href = image.downloadUrl || image.url
    link.download = `${monumentName.replace(/\s+/g, "-")}-${image.id}.jpg`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading && images.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading images from Wikipedia Commons...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <RotateCcw className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">Failed to load images</p>
            <p className="text-sm text-gray-600 mt-2">{error}</p>
          </div>
          <Button onClick={refetch} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">No images found for {monumentName}</p>
          <Button onClick={refetch} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Debug Information */}
      {debug && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Image Source Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-700">Source:</span>
              <p className="text-blue-600">{debug.imageSource}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Wikipedia Images:</span>
              <p className="text-blue-600">{debug.foundWikipediaImages}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Total Available:</span>
              <p className="text-blue-600">{debug.totalImagesAvailable}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Currently Showing:</span>
              <p className="text-blue-600">{debug.imagesReturned}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Gallery */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Display */}
        <div className="relative aspect-video bg-gray-100">
          {imageLoadErrors.has(currentImage.id) ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="font-medium">{monumentName}</p>
                <p className="text-sm">Image not available</p>
                <Button onClick={() => handleImageError(currentImage.id)} variant="outline" size="sm" className="mt-2">
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <>
              <img
                src={currentImage.url || "/placeholder.svg"}
                alt={currentImage.description}
                className="w-full h-full object-cover"
                onError={() => handleImageError(currentImage.id)}
                onLoad={() => handleImageLoad(currentImage.id)}
              />

              {/* Navigation Arrows */}
              <Button
                onClick={handlePrevious}
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                onClick={handleNext}
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Source Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  {currentImage.source}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Image Information */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentImage.description}</h3>
              <p className="text-sm text-gray-600">
                📸 {currentImage.photographer} • 🏛️ {currentImage.source}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-4">
              <Button onClick={() => setIsAutoPlay(!isAutoPlay)} variant="outline" size="sm">
                {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button onClick={() => handleShare(currentImage)} variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>

              <Button onClick={() => handleDownload(currentImage)} variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>

              {currentImage.originalUrl && (
                <Button onClick={() => window.open(currentImage.originalUrl, "_blank")} variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image.thumbnail || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=64&width=80&text=${index + 1}`
                  }}
                />
              </button>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-4 text-center">
              <Button onClick={loadMore} variant="outline" disabled={loading}>
                {loading ? "Loading..." : "Load More Images"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Grid View */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">All Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
            >
              <img
                src={image.thumbnail || "/placeholder.svg"}
                alt={image.description}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `/placeholder.svg?height=200&width=200&text=${monumentName}`
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-2 left-2 right-2">
                <Badge variant="secondary" className="text-xs bg-black/70 text-white border-0">
                  {image.source}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
