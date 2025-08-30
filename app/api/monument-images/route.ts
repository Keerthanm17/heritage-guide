import { type NextRequest, NextResponse } from "next/server"
import { searchWikipediaImages, generateFallbackImages } from "@/lib/wikipedia-images"

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const monumentName = searchParams.get("name")
    const page = Number.parseInt(searchParams.get("page") || "1")

    if (!monumentName) {
      return NextResponse.json({ error: "Monument name is required" }, { status: 400 })
    }

    console.log(`🔍 API Request: Fetching images for monument: "${monumentName}"`)
    console.log(`📄 Page requested: ${page}`)

    let allImages: MonumentImage[] = []
    let wikipediaImages: MonumentImage[] = []

    try {
      // Step 1: Try to get images from Wikipedia Commons
      console.log(`📡 Searching Wikipedia Commons for: ${monumentName}`)
      wikipediaImages = await searchWikipediaImages(monumentName)

      if (wikipediaImages.length > 0) {
        console.log(`✅ Found ${wikipediaImages.length} Wikipedia Commons images`)
        allImages = wikipediaImages
      } else {
        console.log(`⚠️ No Wikipedia Commons images found for "${monumentName}"`)
      }
    } catch (wikipediaError) {
      console.error(`❌ Wikipedia Commons search failed:`, wikipediaError)
    }

    // Step 2: If no Wikipedia images found, use fallback images
    if (allImages.length === 0) {
      console.log(`🔄 Generating fallback images for "${monumentName}"`)
      allImages = generateFallbackImages(monumentName)
      console.log(`✅ Generated ${allImages.length} fallback images`)
    }

    // Step 3: Paginate the results
    const imagesPerPage = 10
    const startIndex = (page - 1) * imagesPerPage
    const endIndex = startIndex + imagesPerPage
    const paginatedImages = allImages.slice(startIndex, endIndex)
    const hasMore = endIndex < allImages.length

    console.log(`✅ Returning ${paginatedImages.length} images for "${monumentName}" (page ${page})`)
    console.log(`📊 Total images available: ${allImages.length}`)
    console.log(`🔄 Has more pages: ${hasMore}`)

    // Step 4: Log the actual image URLs being returned
    console.log(`🖼️ Image URLs being returned:`)
    paginatedImages.forEach((img, idx) => {
      console.log(`   ${idx + 1}. ${img.description} - ${img.source} - ${img.url}`)
    })

    const response = NextResponse.json({
      images: paginatedImages,
      hasMore,
      total: allImages.length,
      page,
      totalPages: Math.ceil(allImages.length / imagesPerPage),
      monumentName,
      debug: {
        requestedMonument: monumentName,
        foundWikipediaImages: wikipediaImages.length,
        totalImagesAvailable: allImages.length,
        imagesReturned: paginatedImages.length,
        imageSource: allImages.length > 0 ? allImages[0].source : "none",
      },
    })

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  } catch (error) {
    console.error("❌ Error in monument-images API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch monument images",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
