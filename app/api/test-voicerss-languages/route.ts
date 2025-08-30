import { type NextRequest, NextResponse } from "next/server"

// Voice RSS API configuration
const VOICE_RSS_API_URL = "https://api.voicerss.org/"
const VOICE_RSS_API_KEY = "dc6fceed3cfc4ab4bd9ccb76af1a52ca"

// Test different language codes
const TEST_LANGUAGE_CODES = [
  "en-us", "en-gb", "en-au",
  "hi-in", "hi", 
  "kn-in", "kn",
  "te-in", "te", 
  "ta-in", "ta",
  "en-in", // Indian English
  "mr-in", // Marathi
  "gu-in", // Gujarati
  "bn-in", // Bengali
  "pa-in", // Punjabi
  "or-in"  // Odia
]

export async function GET() {
  const results: Array<{
    languageCode: string
    supported: boolean
    error?: string
  }> = []

  for (const langCode of TEST_LANGUAGE_CODES) {
    try {
      console.log(`Testing language code: ${langCode}`)
      
      const params = new URLSearchParams({
        key: VOICE_RSS_API_KEY,
        hl: langCode,
        src: "Hello world", // Simple test text
        c: 'MP3',
        f: '44khz_16bit_stereo',
        r: '0',
        b64: 'true'
      })

      const response = await fetch(`${VOICE_RSS_API_URL}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const responseData = await response.text()

      if (responseData.startsWith('ERROR')) {
        results.push({
          languageCode: langCode,
          supported: false,
          error: responseData
        })
      } else {
        results.push({
          languageCode: langCode,
          supported: true
        })
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))

    } catch (error) {
      results.push({
        languageCode: langCode,
        supported: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return NextResponse.json({
    testResults: results,
    summary: {
      total: results.length,
      supported: results.filter(r => r.supported).length,
      unsupported: results.filter(r => !r.supported).length
    }
  })
}
