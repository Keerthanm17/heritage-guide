"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Clock, ArrowLeftRight, Eye, BookOpen, Building, Zap, Loader2, Search, X } from "lucide-react"
import type { Monument } from "@/lib/types"
import { getAllMonuments } from "@/lib/monument-data"

interface MonumentComparisonProps {
  initialMonument1?: Monument
  initialMonument2?: Monument
  preselectedMonumentId?: string
}

interface MonumentImage {
  id: string
  url: string
  thumbnail: string
  description: string
}

export function MonumentComparison({
  initialMonument1,
  initialMonument2,
  preselectedMonumentId,
}: MonumentComparisonProps) {
  const [monuments, setMonuments] = useState<Monument[]>([])
  const [filteredMonuments1, setFilteredMonuments1] = useState<Monument[]>([])
  const [filteredMonuments2, setFilteredMonuments2] = useState<Monument[]>([])
  const [monument1, setMonument1] = useState<Monument | null>(initialMonument1 || null)
  const [monument2, setMonument2] = useState<Monument | null>(initialMonument2 || null)
  const [monument1Image, setMonument1Image] = useState<MonumentImage | null>(null)
  const [monument2Image, setMonument2Image] = useState<MonumentImage | null>(null)
  const [searchQuery1, setSearchQuery1] = useState("")
  const [searchQuery2, setSearchQuery2] = useState("")
  const [loading, setLoading] = useState(true)
  const [showComparison, setShowComparison] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [loadingImages, setLoadingImages] = useState(false)

  useEffect(() => {
    const loadMonuments = async () => {
      try {
        const allMonuments = await getAllMonuments()
        setMonuments(allMonuments)
        setFilteredMonuments1(allMonuments)
        setFilteredMonuments2(allMonuments)

        // Handle preselected monument (from monument details page)
        if (preselectedMonumentId) {
          const preselected = allMonuments.find((m) => m.id === preselectedMonumentId)
          if (preselected) {
            setMonument1(preselected)
            // Auto-select a different monument for comparison
            const otherMonument = allMonuments.find((m) => m.id !== preselectedMonumentId)
            if (otherMonument) {
              setMonument2(otherMonument)
            }
          }
        } else if (!initialMonument1 && !initialMonument2 && allMonuments.length >= 2) {
          // Set default monuments if none provided
          setMonument1(allMonuments[0]) // Taj Mahal
          setMonument2(allMonuments[1]) // Red Fort
        }
      } catch (error) {
        console.error("Error loading monuments:", error)
      } finally {
        setLoading(false)
      }
    }
    loadMonuments()
  }, [initialMonument1, initialMonument2, preselectedMonumentId])

  // Filter monuments based on search query
  useEffect(() => {
    const filtered1 = monuments.filter(
      (monument) =>
        monument.name.toLowerCase().includes(searchQuery1.toLowerCase()) ||
        monument.location.toLowerCase().includes(searchQuery1.toLowerCase()),
    )
    setFilteredMonuments1(filtered1)
  }, [searchQuery1, monuments])

  useEffect(() => {
    const filtered2 = monuments.filter(
      (monument) =>
        monument.name.toLowerCase().includes(searchQuery2.toLowerCase()) ||
        monument.location.toLowerCase().includes(searchQuery2.toLowerCase()),
    )
    setFilteredMonuments2(filtered2)
  }, [searchQuery2, monuments])

  // Fetch monument images when monuments change
  useEffect(() => {
    if (monument1) {
      fetchMonumentImage(monument1.name, setMonument1Image)
    }
  }, [monument1])

  useEffect(() => {
    if (monument2) {
      fetchMonumentImage(monument2.name, setMonument2Image)
    }
  }, [monument2])

  // Reset comparison when monuments change
  useEffect(() => {
    setShowComparison(false)
  }, [monument1, monument2])

  const fetchMonumentImage = async (monumentName: string, setImage: (image: MonumentImage | null) => void) => {
    try {
      setLoadingImages(true)
      const response = await fetch(`/api/monument-images?name=${encodeURIComponent(monumentName)}&page=1`)
      if (response.ok) {
        const data = await response.json()
        if (data.images && data.images.length > 0) {
          setImage(data.images[0]) // Use the first image
        }
      }
    } catch (error) {
      console.error("Error fetching monument image:", error)
      // Fallback to placeholder
      setImage({
        id: "fallback",
        url: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(monumentName)}`,
        thumbnail: `/placeholder.svg?height=100&width=150&text=${encodeURIComponent(monumentName)}`,
        description: `${monumentName} view`,
      })
    } finally {
      setLoadingImages(false)
    }
  }

  const handleMonument1Change = (monumentId: string) => {
    const selected = monuments.find((m) => m.id === monumentId)
    if (selected) {
      setMonument1(selected)
      setSearchQuery1("") // Clear search when selecting
    }
  }

  const handleMonument2Change = (monumentId: string) => {
    const selected = monuments.find((m) => m.id === monumentId)
    if (selected) {
      setMonument2(selected)
      setSearchQuery2("") // Clear search when selecting
    }
  }

  const swapMonuments = () => {
    const temp = monument1
    const tempImage = monument1Image
    setMonument1(monument2)
    setMonument1Image(monument2Image)
    setMonument2(temp)
    setMonument2Image(tempImage)
  }

  const startComparison = async () => {
    setIsComparing(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setShowComparison(true)
    setIsComparing(false)
  }

  const getComparisonInsights = () => {
    if (!monument1 || !monument2) return null

    const insights = []

    // Time period comparison
    if (monument1.yearBuilt && monument2.yearBuilt) {
      const year1 = Number.parseInt(monument1.yearBuilt.split("-")[0])
      const year2 = Number.parseInt(monument2.yearBuilt.split("-")[0])
      const diff = Math.abs(year1 - year2)

      if (diff < 100) {
        insights.push(`Both monuments were built within ${diff} years of each other`)
      } else {
        insights.push(`${monument1.name} is ${diff} years ${year1 < year2 ? "older" : "newer"} than ${monument2.name}`)
      }
    }

    // Location comparison
    const location1 = monument1.location.split(",").pop()?.trim()
    const location2 = monument2.location.split(",").pop()?.trim()

    if (location1 === location2) {
      insights.push(`Both monuments are located in ${location1}`)
    } else {
      insights.push(`${monument1.name} is in ${location1}, while ${monument2.name} is in ${location2}`)
    }

    // Architecture comparison
    const tags1 = monument1.tags || []
    const tags2 = monument2.tags || []
    const commonTags = tags1.filter((tag) => tags2.includes(tag))

    if (commonTags.length > 0) {
      insights.push(`Both share architectural styles: ${commonTags.join(", ")}`)
    }

    return insights
  }

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Building className="h-7 w-7 text-orange-400" />
          Monument Comparison
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Search and select two monuments to explore their differences, similarities, and unique characteristics.
        </p>
      </div>

      {/* Monument Selectors - Single Combined Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* First Monument Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white">First Monument</label>

          {/* Combined Search/Select Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search or select first monument..."
              value={searchQuery1 || monument1?.name || ""}
              onChange={(e) => {
                setSearchQuery1(e.target.value)
                if (!e.target.value) setMonument1(null)
              }}
              className="pl-10 pr-10 bg-black/20 border-white/20 text-white placeholder:text-gray-400"
            />
            {(searchQuery1 || monument1) && (
              <button
                onClick={() => {
                  setSearchQuery1("")
                  setMonument1(null)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Dropdown Results */}
            {searchQuery1 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg max-h-48 overflow-y-auto z-50">
                {filteredMonuments1.length > 0 ? (
                  filteredMonuments1.slice(0, 8).map((monument) => (
                    <button
                      key={monument.id}
                      onClick={() => {
                        handleMonument1Change(monument.id)
                        setSearchQuery1("")
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 text-white text-sm border-b border-white/5 last:border-b-0 flex items-center gap-3"
                    >
                      <div className="w-8 h-6 bg-gray-600 rounded flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">{monument.name}</div>
                        <div className="text-xs text-gray-400">{monument.location}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-400 text-sm">No monuments found</div>
                )}
              </div>
            )}
          </div>

          {/* Selected Monument Preview */}
          {monument1 && !searchQuery1 && (
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                    {monument1Image ? (
                      <Image
                        src={monument1Image.url || "/placeholder.svg"}
                        alt={monument1.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 animate-pulse rounded" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{monument1.name}</h3>
                    <p className="text-sm text-gray-300 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {monument1.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Built: {monument1.yearBuilt || "Unknown"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Second Monument Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white">Second Monument</label>

          {/* Combined Search/Select Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search or select second monument..."
              value={searchQuery2 || monument2?.name || ""}
              onChange={(e) => {
                setSearchQuery2(e.target.value)
                if (!e.target.value) setMonument2(null)
              }}
              className="pl-10 pr-10 bg-black/20 border-white/20 text-white placeholder:text-gray-400"
            />
            {(searchQuery2 || monument2) && (
              <button
                onClick={() => {
                  setSearchQuery2("")
                  setMonument2(null)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Dropdown Results */}
            {searchQuery2 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg max-h-48 overflow-y-auto z-50">
                {filteredMonuments2.length > 0 ? (
                  filteredMonuments2.slice(0, 8).map((monument) => (
                    <button
                      key={monument.id}
                      onClick={() => {
                        handleMonument2Change(monument.id)
                        setSearchQuery2("")
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 text-white text-sm border-b border-white/5 last:border-b-0 flex items-center gap-3"
                    >
                      <div className="w-8 h-6 bg-gray-600 rounded flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">{monument.name}</div>
                        <div className="text-xs text-gray-400">{monument.location}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-400 text-sm">No monuments found</div>
                )}
              </div>
            )}
          </div>

          {/* Selected Monument Preview */}
          {monument2 && !searchQuery2 && (
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                    {monument2Image ? (
                      <Image
                        src={monument2Image.url || "/placeholder.svg"}
                        alt={monument2.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 animate-pulse rounded" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{monument2.name}</h3>
                    <p className="text-sm text-gray-300 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {monument2.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Built: {monument2.yearBuilt || "Unknown"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Swap Button */}
      {monument1 && monument2 && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={swapMonuments} className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            Swap Monuments
          </Button>
        </div>
      )}

      {/* Compare Button */}
      {monument1 && monument2 && !showComparison && (
        <div className="text-center">
          <Button
            onClick={startComparison}
            disabled={isComparing}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isComparing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Compare Monuments
              </>
            )}
          </Button>
          <p className="text-sm text-gray-300 mt-2">
            {isComparing ? "Analyzing monuments..." : "Click to see detailed side-by-side comparison"}
          </p>
        </div>
      )}

      {/* Comparison Results */}
      {monument1 && monument2 && showComparison && (
        <div className="space-y-6">
          {/* Back to Selection Button */}
          <div className="text-center">
            <Button onClick={() => setShowComparison(false)} variant="outline" className="mb-4">
              ← Back to Selection
            </Button>
          </div>

          {/* Comparison Insights */}
          <Card className="bg-orange-500/10 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Eye className="h-5 w-5 text-orange-400" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {getComparisonInsights()?.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span className="text-sm text-gray-200">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monument 1 */}
            <Card className="h-fit bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">{monument1.name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{monument1.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  {monument1Image ? (
                    <Image
                      src={monument1Image.url || "/placeholder.svg"}
                      alt={monument1.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 animate-pulse rounded" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {monument1.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="visit">Visit</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-4">{monument1.description}</p>
                    {monument1.significance && (
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-white">Significance</h4>
                        <p className="text-xs text-muted-foreground line-clamp-3">{monument1.significance}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Built</p>
                          <p className="text-sm font-medium text-white">{monument1.yearBuilt || "Unknown"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Hours</p>
                          <p className="text-sm font-medium text-white">
                            {monument1.visitingHours || "9:00 AM - 5:00 PM"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {monument1.architecture && (
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-white">Architecture</h4>
                        <p className="text-xs text-muted-foreground line-clamp-3">{monument1.architecture}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="visit" className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-white">Entry Fee</h4>
                      <p className="text-xs text-muted-foreground">
                        {monument1.entryFee || "₹50 (Indians), ₹500 (Foreigners)"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-white">Best Time</h4>
                      <p className="text-xs text-muted-foreground">{monument1.bestTimeToVisit || "October to March"}</p>
                    </div>
                    {monument1.nearbyAttractions && (
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-white">Nearby</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {monument1.nearbyAttractions.slice(0, 3).map((attraction, index) => (
                            <li key={index}>• {attraction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Monument 2 */}
            <Card className="h-fit bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">{monument2.name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{monument2.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  {monument2Image ? (
                    <Image
                      src={monument2Image.url || "/placeholder.svg"}
                      alt={monument2.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 animate-pulse rounded" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {monument2.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="visit">Visit</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-4">{monument2.description}</p>
                    {monument2.significance && (
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-white">Significance</h4>
                        <p className="text-xs text-muted-foreground line-clamp-3">{monument2.significance}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Built</p>
                          <p className="text-sm font-medium text-white">{monument2.yearBuilt || "Unknown"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Hours</p>
                          <p className="text-sm font-medium text-white">
                            {monument2.visitingHours || "9:00 AM - 5:00 PM"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {monument2.architecture && (
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-white">Architecture</h4>
                        <p className="text-xs text-muted-foreground line-clamp-3">{monument2.architecture}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="visit" className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-white">Entry Fee</h4>
                      <p className="text-xs text-muted-foreground">
                        {monument2.entryFee || "₹50 (Indians), ₹500 (Foreigners)"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-white">Best Time</h4>
                      <p className="text-xs text-muted-foreground">{monument2.bestTimeToVisit || "October to March"}</p>
                    </div>
                    {monument2.nearbyAttractions && (
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-white">Nearby</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {monument2.nearbyAttractions.slice(0, 3).map((attraction, index) => (
                            <li key={index}>• {attraction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-orange-400" />
                Detailed Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 font-medium text-white">Aspect</th>
                      <th className="text-left py-2 font-medium text-white">{monument1.name}</th>
                      <th className="text-left py-2 font-medium text-white">{monument2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-medium text-gray-300">Location</td>
                      <td className="py-2 text-gray-200">{monument1.location}</td>
                      <td className="py-2 text-gray-200">{monument2.location}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-medium text-gray-300">Built</td>
                      <td className="py-2 text-gray-200">{monument1.yearBuilt || "Unknown"}</td>
                      <td className="py-2 text-gray-200">{monument2.yearBuilt || "Unknown"}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-medium text-gray-300">Entry Fee</td>
                      <td className="py-2 text-gray-200">{monument1.entryFee || "₹50 (Indians), ₹500 (Foreigners)"}</td>
                      <td className="py-2 text-gray-200">{monument2.entryFee || "₹50 (Indians), ₹500 (Foreigners)"}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-medium text-gray-300">Visiting Hours</td>
                      <td className="py-2 text-gray-200">{monument1.visitingHours || "9:00 AM - 5:00 PM"}</td>
                      <td className="py-2 text-gray-200">{monument2.visitingHours || "9:00 AM - 5:00 PM"}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-medium text-gray-300">Best Time to Visit</td>
                      <td className="py-2 text-gray-200">{monument1.bestTimeToVisit || "October to March"}</td>
                      <td className="py-2 text-gray-200">{monument2.bestTimeToVisit || "October to March"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
