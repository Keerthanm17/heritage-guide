import { type NextRequest, NextResponse } from "next/server"

// Language mapping for free TTS service
const TTS_LANGUAGE_MAPPING: Record<string, string> = {
  "en": "en",
  "hi": "hi", // Hindi
  "kn": "kn", // Kannada
  "te": "te", // Telugu
  "ta": "ta", // Tamil
}

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json()

    if (!text || !language) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Validate language
    const ttsLanguage = TTS_LANGUAGE_MAPPING[language]
    if (!ttsLanguage) {
      return NextResponse.json({ 
        error: "Unsupported language", 
        supportedLanguages: Object.keys(TTS_LANGUAGE_MAPPING)
      }, { status: 400 })
    }

    console.log(`[Free TTS] Request - Language: ${language} (${ttsLanguage}), Text: ${text.substring(0, 100)}...`)

    try {
      // Use a free TTS service (ResponsiveVoice.js alternative)
      // This is a simple approach that should work for basic TTS needs
      
      // For now, we'll return a message indicating that the frontend should use Web Speech API
      // In a real implementation, you could:
      // 1. Use a free TTS API service
      // 2. Implement a simple TTS using Web Speech API on the frontend
      // 3. Use a different free TTS library
      
      console.log(`[Free TTS] Frontend should use Web Speech API for: ${ttsLanguage}`)
      
      return NextResponse.json({
        error: "Use Web Speech API",
        message: "For free TTS, please use the Web Speech API on the frontend",
        fallback: true,
        suggestion: "The frontend component will automatically fall back to Web Speech API"
      }, { status: 200 })

    } catch (ttsError: any) {
      console.error(`[Free TTS] Error: ${ttsError.message}`)
      return NextResponse.json({
        error: "TTS generation failed",
        message: ttsError.message,
        fallback: true
      }, { status: 200 })
    }

  } catch (error: any) {
    console.error(`[Free TTS] General error: ${error.message}`)
    return NextResponse.json({
      error: "General error",
      message: error.message,
      fallback: true
    }, { status: 200 })
  }
}
