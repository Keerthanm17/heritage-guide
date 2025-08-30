/**
 * Gemini Translation Service
 * Replaces LibreTranslate with Google's Gemini API for high-quality translations
 */

interface TranslationResult {
  translatedText: string
  error?: string
}

interface MultipleTranslationResult {
  translatedText: string
  error?: string
}

// Language configurations with proper language codes
interface LanguageConfigItem {
  name: string
  code: string
  voice: string
}
const LANGUAGE_CONFIG: { [key: string]: LanguageConfigItem } = {
  en: { name: "English", code: "en", voice: "en-US" },
  hi: { name: "Hindi", code: "hi", voice: "hi-IN" },
  kn: { name: "Kannada", code: "kn", voice: "kn-IN" },
  te: { name: "Telugu", code: "te", voice: "te-IN" },
  ta: { name: "Tamil", code: "ta", voice: "ta-IN" },
  mr: { name: "Marathi", code: "mr", voice: "mr-IN" },
  gu: { name: "Gujarati", code: "gu", voice: "gu-IN" },
  bn: { name: "Bengali", code: "bn", voice: "bn-IN" },
  pa: { name: "Punjabi", code: "pa", voice: "pa-IN" },
  or: { name: "Odia", code: "or", voice: "or-IN" },
}

/**
 * Translate text using Gemini API
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage = "en",
): Promise<TranslationResult> {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured")
    }

    // Skip translation if source and target are the same
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text }
    }

    const targetLangName = LANGUAGE_CONFIG[targetLanguage]?.name || targetLanguage
    const sourceLangName = LANGUAGE_CONFIG[sourceLanguage]?.name || sourceLanguage

    const prompt = `Translate the following text from ${sourceLangName} to ${targetLangName}. 
    Provide only the translation without any additional text, explanations, or formatting.
    
    Text to translate: "${text}"`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!translatedText) {
      throw new Error("No translation received from Gemini API")
    }

    return { translatedText }
  } catch (error) {
    console.error("Gemini translation error:", error)
    return {
      translatedText: text, // Fallback to original text
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Translate multiple texts in a single request for efficiency
 */
export async function translateMultiple(
  texts: string[],
  targetLanguage: string,
  sourceLanguage = "en",
): Promise<MultipleTranslationResult[]> {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured")
    }

    // Skip translation if source and target are the same
    if (sourceLanguage === targetLanguage) {
      return texts.map((text) => ({ translatedText: text }))
    }

    const targetLangName = LANGUAGE_CONFIG[targetLanguage]?.name || targetLanguage
    const sourceLangName = LANGUAGE_CONFIG[sourceLanguage]?.name || sourceLanguage

    // Create numbered list for batch translation
    const numberedTexts = texts.map((text, index) => `${index + 1}. ${text}`).join("\n")

    const prompt = `Translate the following numbered texts from ${sourceLangName} to ${targetLangName}. 
    Provide only the translations in the same numbered format without any additional text or explanations.
    
    Texts to translate:
    ${numberedTexts}`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 4096,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const translatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!translatedContent) {
      throw new Error("No translation received from Gemini API")
    }

    // Parse the numbered translations
    const translatedLines = translatedContent.split("\n").filter((line: string) => line.trim())
    const results: MultipleTranslationResult[] = []

    for (let i = 0; i < texts.length; i++) {
      const expectedPrefix = `${i + 1}.`
      const matchingLine = translatedLines.find((line: string) => line.trim().startsWith(expectedPrefix))

      if (matchingLine) {
        const translatedText = matchingLine.replace(expectedPrefix, "").trim()
        results.push({ translatedText })
      } else {
        // Fallback to original text if parsing fails
        results.push({
          translatedText: texts[i],
          error: `Failed to parse translation for item ${i + 1}`,
        })
      }
    }

    return results
  } catch (error) {
    console.error("Gemini batch translation error:", error)
    // Return original texts as fallback
    return texts.map((text) => ({
      translatedText: text,
      error: error instanceof Error ? error.message : String(error),
    }))
  }
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(languageCode: string): boolean {
  return languageCode in LANGUAGE_CONFIG
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): Record<string, string> {
  const languages: Record<string, string> = {}
  Object.entries(LANGUAGE_CONFIG).forEach(([code, config]) => {
    languages[code] = config.name
  })
  return languages
}

/**
 * Get voice language code for TTS
 */
export function getVoiceLanguage(languageCode: string): string {
  return LANGUAGE_CONFIG[languageCode]?.voice || "en-US"
}
