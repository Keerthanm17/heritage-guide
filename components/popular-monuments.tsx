"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { searchWikipediaImages } from "@/lib/wikipedia-images"
import { TextToSpeech } from "@/components/text-to-speech"

interface Monument {
  id: string
  name: string
  location: string
  yearBuilt: string
  description: string
  significance: string
}

const popularMonuments: Monument[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    yearBuilt: "1653",
    description: "An ivory-white marble mausoleum and UNESCO World Heritage Site",
    significance: "Symbol of eternal love and Mughal architecture",
  },
  {
    id: "bijapur-gol-gumbaz",
    name: "Gol Gumbaz",
    location: "Bijapur, Karnataka",
    yearBuilt: "1656",
    description: "Mausoleum with the world's second largest dome",
    significance: "Architectural marvel of the Deccan Sultanate",
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    location: "Mysore, Karnataka",
    yearBuilt: "1912",
    description: "Indo-Saracenic palace of the Wadiyar dynasty",
    significance: "Royal heritage and cultural center of Karnataka",
  },
  {
    id: "red-fort-delhi",
    name: "Red Fort",
    location: "Delhi",
    yearBuilt: "1648",
    description: "Mughal fortress and UNESCO World Heritage Site",
    significance: "Symbol of India's independence and Mughal power",
  },
  {
    id: "hampi-virupaksha-temple",
    name: "Virupaksha Temple Hampi",
    location: "Hampi, Karnataka",
    yearBuilt: "7th century",
    description: "Ancient temple dedicated to Lord Shiva",
    significance: "Center of the Vijayanagara Empire",
  },
  {
    id: "qutub-minar-delhi",
    name: "Qutub Minar",
    location: "Delhi",
    yearBuilt: "1220",
    description: "Tallest brick minaret in the world",
    significance: "Victory tower of the Delhi Sultanate",
  },
]

interface MonumentImageState {
  [key: string]: {
    url: string
    source: string
    loading: boolean
    error: boolean
  }
}

export function PopularMonuments() {
  const [monumentImages, setMonumentImages] = useState<MonumentImageState>({})

  // Generate a reliable fallback image URL
  const getFallbackImage = (monumentName: string) => {
    const seed = monumentName.toLowerCase().replace(/\s+/g, "-")
    const imageId = Math.abs(seed.split("").reduce((a, b) => a + b.charCodeAt(0), 0))
    return `https://picsum.photos/seed/${imageId}/400/300`
  }

  useEffect(() => {
    // Initialize loading state for all monuments
    const initialState: MonumentImageState = {}
    popularMonuments.forEach((monument) => {
      initialState[monument.id] = {
        url: getFallbackImage(monument.name), // Set fallback immediately
        source: "Loading",
        loading: true,
        error: false,
      }
    })
    setMonumentImages(initialState)

    // Fetch images for each monument
    popularMonuments.forEach(async (monument) => {
      try {
        console.log(`🖼️ Fetching image for ${monument.name}`)

        const images = await searchWikipediaImages(monument.name)

        if (images && images.length > 0) {
          console.log(`✅ Found Wikipedia image for ${monument.name}`)
          setMonumentImages((prev) => ({
            ...prev,
            [monument.id]: {
              url: images[0].url,
              source: "Wikipedia Commons",
              loading: false,
              error: false,
            },
          }))
        } else {
          console.log(`⚠️ No Wikipedia images found for ${monument.name}, using fallback`)
          setMonumentImages((prev) => ({
            ...prev,
            [monument.id]: {
              url: getFallbackImage(monument.name),
              source: "Placeholder",
              loading: false,
              error: false,
            },
          }))
        }
      } catch (error) {
        console.error(`❌ Error fetching image for ${monument.name}:`, error)
        
        // Set error state with fallback
        setMonumentImages((prev) => ({
          ...prev,
          [monument.id]: {
            url: getFallbackImage(monument.name),
            source: "Placeholder",
            loading: false,
            error: true,
          },
        }))
      }
    })
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Heritage Sites</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover India's most iconic monuments and heritage sites with our AI-powered recognition system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularMonuments.map((monument) => {
            const imageState = monumentImages[monument.id]
            const imageUrl = imageState?.url || getFallbackImage(monument.name)

            return (
              <Link key={monument.id} href={`/monument/${monument.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {imageState?.loading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-500">Loading image...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={imageUrl}
                          alt={monument.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            const fallbackUrl = getFallbackImage(monument.name)
                            target.src = fallbackUrl

                            // Update state to show error
                            setMonumentImages((prev) => ({
                              ...prev,
                              [monument.id]: {
                                ...prev[monument.id],
                                url: fallbackUrl,
                                source: "Placeholder",
                                error: true,
                              },
                            }))
                          }}
                        />

                        {/* Source Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant={imageState?.source === "Wikipedia Commons" ? "default" : "secondary"}
                            className={`text-xs ${
                              imageState?.source === "Wikipedia Commons"
                                ? "bg-green-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {imageState?.source || "Loading"}
                          </Badge>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-black/70 text-white border-0">
                            <Calendar className="h-3 w-3 mr-1" />
                            {monument.yearBuilt}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {monument.name}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm">{monument.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{monument.description}</p>

                    <div className="flex items-start gap-2 mb-3">
                      <Users className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-500 line-clamp-2">{monument.significance}</p>
                    </div>

                    {/* TTS Button */}
                    <div className="flex justify-end">
                      <TextToSpeech 
                        text={`${monument.name}. ${monument.description}. ${monument.significance}`}
                        language="en"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want to explore more monuments? Upload an image to identify any heritage site!
          </p>
          <Link
            href="/#upload"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Try Monument Recognition
          </Link>
        </div>
      </div>
    </section>
  )
}
