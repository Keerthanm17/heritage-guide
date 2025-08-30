import { type NextRequest, NextResponse } from "next/server"
import { recognizeMonument } from "@/lib/image-recognition"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Validate file type
    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Please upload an image smaller than 10MB." }, { status: 400 })
    }

    console.log(`Processing image: ${image.name}, size: ${image.size} bytes, type: ${image.type}`)

    // Process the image and recognize the monument
    const result = await recognizeMonument(image)

    // Check if there was an error
    if (result.error) {
      console.error("Recognition error:", result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Return the recognition result
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json(
      {
        error: "Failed to process image. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
