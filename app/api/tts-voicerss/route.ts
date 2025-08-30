import { type NextRequest, NextResponse } from "next/server"

// Voice RSS API configuration
const VOICE_RSS_API_URL = "https://api.voicerss.org/"
const VOICE_RSS_API_KEY = "dc6fceed3cfc4ab4bd9ccb76af1a52ca"

// Language mapping for Voice RSS API
const VOICE_RSS_LANGUAGE_MAPPING: Record<string, string> = {
  "en": "en-us",
  "hi": "hi-in", // Hindi
  "kn": "kn-in", // Kannada
  "te": "te-in", // Telugu
  "ta": "ta-in", // Tamil
}

// Alternative language codes for better compatibility
const VOICE_RSS_ALTERNATIVE_LANGUAGES: Record<string, string[]> = {
  "hi": ["hi-in", "hi", "en-in"], // Hindi fallbacks
  "kn": ["kn-in", "kn", "en-in"], // Kannada fallbacks
  "te": ["te-in", "te", "en-in"], // Telugu fallbacks
  "ta": ["ta-in", "ta", "en-in"], // Tamil fallbacks
}

// Voice mapping for Voice RSS API - using actual available voices
const VOICE_RSS_VOICE_MAPPING: Record<string, string> = {
  "en": "Linda", // English female voice
  "hi": "Priya", // Hindi female voice
  "kn": "Kavya", // Kannada female voice
  "te": "Teja",  // Telugu female voice
  "ta": "Tara",  // Tamil female voice
}

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json()

    if (!text || !language) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Validate language
    const ttsLanguage = VOICE_RSS_LANGUAGE_MAPPING[language]
    if (!ttsLanguage) {
      return NextResponse.json({ 
        error: "Unsupported language", 
        supportedLanguages: Object.keys(VOICE_RSS_LANGUAGE_MAPPING)
      }, { status: 400 })
    }

    console.log(`[Voice RSS TTS] Request - Language: ${language} (${ttsLanguage}), Text: ${text.substring(0, 100)}...`)

    try {
      // Try multiple language codes for Indian languages
      const languageCodesToTry = language === "en" 
        ? [ttsLanguage] 
        : [ttsLanguage, ...(VOICE_RSS_ALTERNATIVE_LANGUAGES[language] || [])]

      let audioData = null
      let successfulLanguage = null

      for (const langCode of languageCodesToTry) {
        try {
          console.log(`[Voice RSS TTS] Trying language code: ${langCode}`)
          
          // Prepare Voice RSS API parameters
          const params = new URLSearchParams({
            key: VOICE_RSS_API_KEY,
            hl: langCode,
            src: text,
            c: 'MP3', // Audio format
            f: '44khz_16bit_stereo', // Audio quality
            r: '0', // Speech rate (0 = normal)
            b64: 'true' // Return base64 encoded audio
          })

          // For English, try with specific voice
          if (language === "en") {
            const voice = VOICE_RSS_VOICE_MAPPING[language]
            if (voice) {
              params.append('v', voice)
            }
          }

          console.log(`[Voice RSS TTS] Making API request with params:`, {
            language: langCode,
            textLength: text.length,
            hasVoice: language === "en"
          })

          // Make request to Voice RSS API
          const response = await fetch(`${VOICE_RSS_API_URL}?${params.toString()}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })

          if (!response.ok) {
            console.log(`[Voice RSS TTS] Failed with status: ${response.status}`)
            continue
          }

          const responseData = await response.text()

          // Check if the response contains an error
          if (responseData.startsWith('ERROR')) {
            console.log(`[Voice RSS TTS] API returned error: ${responseData}`)
            continue
          }

          // Success! We got valid audio data
          audioData = responseData
          successfulLanguage = langCode
          console.log(`[Voice RSS TTS] Success with language code: ${langCode}`)
          break

        } catch (error) {
          console.log(`[Voice RSS TTS] Failed with language code ${langCode}:`, error)
          continue
        }
      }

      if (!audioData) {
        throw new Error(`Voice RSS API failed for all language codes tried`)
      }

      console.log(`[Voice RSS TTS] Success - Generated audio for language: ${language} (using code: ${successfulLanguage})`)

      return NextResponse.json({
        success: true,
        audioData: audioData,
        format: 'base64',
        language: language,
        actualLanguageCode: successfulLanguage,
        method: 'Voice RSS API'
      })

    } catch (ttsError: any) {
      console.error(`[Voice RSS TTS] Error: ${ttsError.message}`)
      return NextResponse.json({
        error: "TTS generation failed",
        message: ttsError.message,
        fallback: true
      }, { status: 200 })
    }

  } catch (error: any) {
    console.error(`[Voice RSS TTS] General error: ${error.message}`)
    return NextResponse.json({
      error: "General error",
      message: error.message,
      fallback: true
    }, { status: 200 })
  }
}
