/**
 * This file contains the translation functionality using Google's Gemini API.
 * Provides translation services for Indian heritage monuments in multiple languages.
 */

// Gemini API configuration
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = "";

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1 second between requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Simple in-memory cache for translations
const translationCache = new Map<string, string>();

// Cache key generator
const getCacheKey = (text: string, targetLanguage: string, sourceLanguage: string = "en") => {
  return `${sourceLanguage}:${targetLanguage}:${text}`;
};

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

// Language code mapping for Gemini API (translation)
const LANGUAGE_MAPPING: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  kn: "Kannada", 
  te: "Telugu",
  ta: "Tamil",
};

// Language code mapping for TTS (speech synthesis)
export const TTS_LANGUAGE_MAPPING: Record<string, string> = {
  en: "en-US",
  hi: "hi-IN",
  kn: "kn-IN", 
  te: "te-IN",
  ta: "ta-IN",
};

// Utility function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Gemini API function for translation with rate limiting and retry logic
export async function translateTextWithGemini(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = "en"
): Promise<string> {
  // Don't translate if target language is English or text is empty
  if (targetLanguage === "en" || !text.trim()) {
    return text;
  }

  const targetLang = LANGUAGE_MAPPING[targetLanguage];
  if (!targetLang) {
    console.warn(`Unsupported language: ${targetLanguage}`);
    return text;
  }

  // Check cache first
  const cacheKey = getCacheKey(text, targetLanguage, sourceLanguage);
  if (translationCache.has(cacheKey)) {
    console.log(`Cache hit for translation: ${text.substring(0, 50)}...`);
    return translationCache.get(cacheKey)!;
  }

  const prompt = `Translate the following text into ${targetLang}. Only provide the translated text without any additional context or explanations:

${text}`;

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Add delay between requests to respect rate limits
      if (attempt > 1) {
        await delay(RETRY_DELAY * attempt);
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 429) {
        // Rate limit hit, wait longer before retry
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAY * attempt;
        console.warn(`Rate limit hit, waiting ${waitTime}ms before retry ${attempt}/${MAX_RETRIES}`);
        await delay(waitTime);
        continue;
      }

      if (!response.ok) {
        throw new Error(`Gemini API request failed: ${response.status} ${response.statusText}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message}`);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No translation response from Gemini API");
      }

      const translatedText = data.candidates[0].content.parts[0].text;
      const finalText = translatedText.trim();
      
      // Cache the result
      translationCache.set(cacheKey, finalText);
      
      return finalText;

    } catch (error) {
      lastError = error as Error;
      console.warn(`Translation attempt ${attempt}/${MAX_RETRIES} failed:`, error);
      
      if (attempt === MAX_RETRIES) {
        console.error("All translation attempts failed:", error);
        // Return original text if all retries fail
        return text;
      }
    }
  }

  // This should never be reached, but just in case
  return text;
}

// Function to get translated text for TTS in the selected language
export async function getTranslatedTextForTTS(
  text: string,
  targetLanguage: string
): Promise<string> {
  try {
    // If English, return as is
    if (targetLanguage === "en") {
      return text;
    }

    // Translate the text to the target language
    const translatedText = await translateTextWithGemini(text, targetLanguage);
    console.log(`Translated text for TTS (${targetLanguage}):`, translatedText.substring(0, 100));
    return translatedText;
  } catch (error) {
    console.error("Error getting translated text for TTS:", error);
    // Return original text if translation fails
    return text;
  }
}

// Sequential translation helper to avoid overwhelming the API
async function translateSequentially(
  items: string[],
  targetLanguage: string,
  onProgress?: () => void
): Promise<string[]> {
  const results: string[] = [];
  
  for (let i = 0; i < items.length; i++) {
    const translated = await translateTextWithGemini(items[i], targetLanguage);
    results.push(translated);
    
    // Call progress callback for each item
    onProgress?.();
    
    // Add delay between requests to respect rate limits
    if (i < items.length - 1) {
      await delay(RATE_LIMIT_DELAY);
    }
  }
  
  return results;
}

// Translate all monument fields using Gemini API with rate limiting
export async function translateMonumentFieldsWithGemini(
  monument: any,
  targetLanguage: string,
  onProgress?: (progress: { current: number; total: number; field: string }) => void
): Promise<any> {
  if (targetLanguage === "en") {
    return monument;
  }

  const fieldsToTranslate = [
    "description",
    "significance", 
    "history",
    "architecture",
    "bestTimeToVisit",
    "photography",
    "howToReach"
  ];

  const translatedMonument = { ...monument };

  // Calculate total items to translate
  let totalItems = 0;
  let currentItem = 0;

  // Count text fields
  for (const field of fieldsToTranslate) {
    if (monument[field] && typeof monument[field] === "string") {
      totalItems++;
    }
  }

  // Count array fields
  if (monument.historicalEvents && Array.isArray(monument.historicalEvents)) {
    totalItems += monument.historicalEvents.length;
  }
  if (monument.architecturalFeatures && Array.isArray(monument.architecturalFeatures)) {
    totalItems += monument.architecturalFeatures.length;
  }
  if (monument.nearbyAttractions && Array.isArray(monument.nearbyAttractions)) {
    totalItems += monument.nearbyAttractions.length;
  }

  // Translate text fields sequentially to avoid rate limits
  for (const field of fieldsToTranslate) {
    if (monument[field] && typeof monument[field] === "string") {
      currentItem++;
      onProgress?.({ current: currentItem, total: totalItems, field });
      
      translatedMonument[field] = await translateTextWithGemini(
        monument[field],
        targetLanguage
      );
      
      // Add delay between field translations
      await delay(RATE_LIMIT_DELAY);
    }
  }

  // Translate array fields sequentially instead of using Promise.all
  if (monument.historicalEvents && Array.isArray(monument.historicalEvents)) {
    translatedMonument.historicalEvents = await translateSequentially(
      monument.historicalEvents,
      targetLanguage,
      () => {
        currentItem++;
        onProgress?.({ current: currentItem, total: totalItems, field: "historicalEvents" });
      }
    );
  }

  if (monument.architecturalFeatures && Array.isArray(monument.architecturalFeatures)) {
    translatedMonument.architecturalFeatures = await translateSequentially(
      monument.architecturalFeatures,
      targetLanguage,
      () => {
        currentItem++;
        onProgress?.({ current: currentItem, total: totalItems, field: "architecturalFeatures" });
      }
    );
  }

  if (monument.nearbyAttractions && Array.isArray(monument.nearbyAttractions)) {
    translatedMonument.nearbyAttractions = await translateSequentially(
      monument.nearbyAttractions,
      targetLanguage,
      () => {
        currentItem++;
        onProgress?.({ current: currentItem, total: totalItems, field: "nearbyAttractions" });
      }
    );
  }

  return translatedMonument;
}

// Supported Indian languages
export const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "kn", name: "Kannada" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
];

// Function to clear translation cache
export function clearTranslationCache(): void {
  translationCache.clear();
  console.log("Translation cache cleared");
}

// Function to get cache statistics
export function getTranslationCacheStats(): { size: number } {
  return { size: translationCache.size };
}

// Export the main translation function for backward compatibility
export const translateText = translateTextWithGemini;
export const translateMonumentFields = translateMonumentFieldsWithGemini;
