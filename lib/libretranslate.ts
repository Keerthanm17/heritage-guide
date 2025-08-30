import axios from 'axios'

// LibreTranslate API configuration
const LIBRETRANSLATE_URL = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate'
const LIBRETRANSLATE_API_KEY = process.env.LIBRETRANSLATE_API_KEY // Optional

// Language code mappings for LibreTranslate
const LANGUAGE_MAPPINGS = {
  hi: 'hi', // Hindi
  te: 'te', // Telugu
  kn: 'kn', // Kannada
  ta: 'ta', // Tamil
  en: 'en', // English
}

export interface TranslationRequest {
  text: string
  source: string
  target: string
}

export interface TranslationResponse {
  translatedText: string
  error?: string
}

/**
 * Translate text using LibreTranslate API
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<TranslationResponse> {
  try {
    // Skip translation if source and target are the same
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text }
    }

    // Map language codes
    const sourceLang = LANGUAGE_MAPPINGS[sourceLanguage as keyof typeof LANGUAGE_MAPPINGS] || sourceLanguage
    const targetLang = LANGUAGE_MAPPINGS[targetLanguage as keyof typeof LANGUAGE_MAPPINGS] || targetLanguage

    // Check if target language is supported
    if (!LANGUAGE_MAPPINGS[targetLanguage as keyof typeof LANGUAGE_MAPPINGS]) {
      return {
        translatedText: text,
        error: `Language ${targetLanguage} not supported`
      }
    }

    console.log(`Translating from ${sourceLang} to ${targetLang}: "${text.substring(0, 50)}..."`)

    // Prepare request data
    const requestData: any = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    }

    // Add API key if available
    if (LIBRETRANSLATE_API_KEY) {
      requestData.api_key = LIBRETRANSLATE_API_KEY
    }

    // Make request to LibreTranslate
    const response = await axios.post(LIBRETRANSLATE_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    })

    if (response.data && response.data.translatedText) {
      console.log(`Translation successful: "${response.data.translatedText.substring(0, 50)}..."`)
      return {
        translatedText: response.data.translatedText
      }
    } else {
      throw new Error('Invalid response format from LibreTranslate')
    }

  } catch (error: any) {
    console.error('LibreTranslate API error:', error.message)
    
    // Return original text with error info
    return {
      translatedText: text,
      error: error.response?.data?.error || error.message || 'Translation failed'
    }
  }
}

/**
 * Translate multiple texts in parallel
 */
export async function translateMultiple(
  texts: string[],
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<TranslationResponse[]> {
  try {
    const promises = texts.map(text => 
      translateText(text, targetLanguage, sourceLanguage)
    )
    
    return await Promise.all(promises)
  } catch (error) {
    console.error('Multiple translation error:', error)
    // Return original texts with errors
    return texts.map(text => ({
      translatedText: text,
      error: 'Batch translation failed'
    }))
  }
}

/**
 * Get supported languages
 */
export function getSupportedLanguages(): Record<string, string> {
  return {
    en: 'English',
    hi: 'Hindi (हिन्दी)',
    te: 'Telugu (తెలుగు)',
    kn: 'Kannada (ಕನ್ನಡ)',
    ta: 'Tamil (தமிழ்)'
  }
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(languageCode: string): boolean {
  return languageCode in LANGUAGE_MAPPINGS
}
