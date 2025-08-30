import { type NextRequest, NextResponse } from "next/server"
import { getMonumentById } from "@/lib/monument-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const monumentId = params.id
    const monument = await getMonumentById(monumentId)

    if (!monument) {
      return NextResponse.json({ error: "Monument not found" }, { status: 404 })
    }

    return NextResponse.json(monument)
  } catch (error) {
    console.error("Error fetching monument:", error)
    return NextResponse.json({ error: "Failed to fetch monument data" }, { status: 500 })
  }
}
