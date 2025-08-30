"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MonumentImageGallery } from "@/components/monument-image-gallery"
import { getMonumentById } from "@/lib/monument-data"
import type { Monument } from "@/lib/types"

export default function MonumentGalleryPage({ params }: { params: { id: string } }) {
  const [monument, setMonument] = useState<Monument | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMonument = async () => {
      try {
        const monumentData = await getMonumentById(params.id)
        if (!monumentData) {
          notFound()
        }
        setMonument(monumentData)
      } catch (error) {
        console.error("Error loading monument:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    loadMonument()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  if (!monument) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Monument Details
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{monument.name}</h1>
          <p className="text-muted-foreground">
            📸 Explore different perspectives and views of this magnificent heritage site
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <MonumentImageGallery monumentName={monument.name} monumentId={monument.id} />

      {/* Monument Info Summary */}
      <div className="mt-8 p-6 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">About {monument.name}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{monument.description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span>
            <strong>Location:</strong> {monument.location}
          </span>
          {monument.yearBuilt && (
            <span>
              <strong>Built:</strong> {monument.yearBuilt}
            </span>
          )}
          {monument.visitingHours && (
            <span>
              <strong>Hours:</strong> {monument.visitingHours}
            </span>
          )}
        </div>
      </div>
    </main>
  )
}
