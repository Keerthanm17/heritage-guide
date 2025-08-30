"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Clock, Tag, Users, Camera, Ticket, ArrowLeftRight, ImageIcon } from "lucide-react"
import type { Monument } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { TextToSpeech } from "@/components/text-to-speech"

interface MonumentDetailsProps {
  monument: Monument
}

export function MonumentDetails({ monument }: MonumentDetailsProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    // Check if there's an uploaded image in sessionStorage
    const storedImage = sessionStorage.getItem(`uploaded_image_${monument.id}`)
    if (storedImage) {
      setUploadedImage(storedImage)
    }
  }, [monument.id])

  return (
    <div className="space-y-6">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        {uploadedImage ? (
          // Show the uploaded image if available
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt={`Uploaded image of ${monument.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Otherwise show the default image
          <Image
            src={monument.imageUrl || "/placeholder.svg?height=400&width=800"}
            alt={monument.name}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{monument.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <MapPin className="h-4 w-4" />
            <span>{monument.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {monument.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Built in</p>
                <p className="font-medium">{monument.yearBuilt || "Unknown"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Visiting Hours</p>
                <p className="font-medium">{monument.visitingHours || "9:00 AM - 5:00 PM"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Entry Fee</p>
                <p className="font-medium">{monument.entryFee || "₹50 (Indians), ₹500 (Foreigners)"}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="visitor-info">Visitor Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="flex justify-end mb-2">
                <TextToSpeech
                  text={`Overview: ${monument.description || "No description available."}${monument.significance ? ` Cultural Significance: ${monument.significance}` : ""}`}
                  language={monument.voiceLanguage || "en"}
                />
              </div>
              <p className="text-muted-foreground leading-relaxed">{monument.description}</p>

              {monument.significance && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Cultural Significance</h3>
                  <p className="text-muted-foreground leading-relaxed">{monument.significance}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="flex justify-end mb-2">
                <TextToSpeech
                  text={`History: ${monument.history || "Historical information about this monument is currently being compiled."}${monument.historicalEvents ? ` Key Historical Events: ${monument.historicalEvents.join(", ")}` : ""}`}
                  language={monument.voiceLanguage || "en"}
                />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {monument.history || "Historical information about this monument is currently being compiled."}
              </p>

              {monument.historicalEvents && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Key Historical Events</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {monument.historicalEvents.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="architecture" className="mt-4">
              <div className="flex justify-end mb-2">
                <TextToSpeech
                  text={`Architecture: ${monument.architecture || "Architectural details about this monument are currently being compiled."}${monument.architecturalFeatures ? ` Notable Architectural Features: ${monument.architecturalFeatures.join(", ")}` : ""}`}
                  language={monument.voiceLanguage || "en"}
                />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {monument.architecture || "Architectural details about this monument are currently being compiled."}
              </p>

              {monument.architecturalFeatures && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Notable Architectural Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {monument.architecturalFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="visitor-info" className="mt-4">
              <div className="flex justify-end mb-2">
                <TextToSpeech
                  text={`Visitor Info: Best Time to Visit: ${monument.bestTimeToVisit || "October to March when the weather is pleasant."} Photography: ${monument.photography || "Photography is allowed. Professional photography may require a permit."} How to Reach: ${monument.howToReach || "Information on how to reach this monument is currently being compiled."} Nearby Attractions: ${monument.nearbyAttractions ? monument.nearbyAttractions.join(", ") : "Information on nearby attractions is currently being compiled."}`}
                  language={monument.voiceLanguage || "en"}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Best Time to Visit
                  </h3>
                  <p className="text-muted-foreground">
                    {monument.bestTimeToVisit || "October to March when the weather is pleasant."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Photography
                  </h3>
                  <p className="text-muted-foreground">
                    {monument.photography || "Photography is allowed. Professional photography may require a permit."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">How to Reach</h3>
                  <p className="text-muted-foreground">
                    {monument.howToReach || "Information on how to reach this monument is currently being compiled."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Nearby Attractions</h3>
                  {monument.nearbyAttractions ? (
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {monument.nearbyAttractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      Information on nearby attractions is currently being compiled.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`/compare?monument=${monument.id}`, "_blank")}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Compare with Another Monument
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`/gallery/${monument.id}`, "_blank")}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              View Other Images of This Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MonumentDetails
