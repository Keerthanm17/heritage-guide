"use client"

import { useState, useEffect } from "react"

interface MonumentImage {
  id: string
  url: string
  thumbnail: string
  description: string
  photographer: string
  source: string
  originalUrl?: string
  downloadUrl?: string
}

interface UseMonumentImagesResult {
  images: MonumentImage[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  refetch: () => void
  debug: {
    requestedMonument: string
    foundWikipediaImages: number
    totalImagesAvailable: number
    imagesReturned: number
    imageSource: string
  } | null
}

export function useMonumentImages(monumentName: string): UseMonumentImagesResult {
  const [images, setImages] = useState<MonumentImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [debug, setDebug] = useState<UseMonumentImagesResult["debug"]>(null)

  const fetchImages = async (pageNum: number, append = false) => {
    if (!monumentName) return

    setLoading(true)
    setError(null)

    try {
      console.log(`🔍 Fetching images for "${monumentName}" (page ${pageNum})`)

      const response = await fetch(`/api/monument-images?name=${encodeURIComponent(monumentName)}&page=${pageNum}&limit=10`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      console.log(`✅ Received ${data.images.length} images from API`)
      console.log(`📊 Debug info:`, data.debug)

      if (append) {
        setImages((prev) => [...prev, ...data.images])
      } else {
        setImages(data.images)
      }

      setHasMore(data.hasMore)
      setDebug(data.debug)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch images"
      console.error(`❌ Error fetching images for "${monumentName}":`, err)
      setError(errorMessage)

      // Set empty array on error
      if (!append) {
        setImages([])
      }
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchImages(nextPage, true)
    }
  }

  const refetch = () => {
    setPage(1)
    setImages([])
    fetchImages(1, false)
  }

  useEffect(() => {
    if (monumentName) {
      console.log(`🎯 Monument changed to: "${monumentName}" - fetching images`)
      setPage(1)
      setImages([])
      fetchImages(1, false)
    }
  }, [monumentName])

  return {
    images,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    debug,
  }
}
