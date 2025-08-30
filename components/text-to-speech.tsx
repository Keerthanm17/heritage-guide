"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getTranslatedTextForTTS, TTS_LANGUAGE_MAPPING } from "@/lib/translation"

interface TextToSpeechProps {
  text: string
  language?: string
}

// Language mapping for Web Speech API
const SPEECH_LANGUAGE_MAPPING: Record<string, string> = {
  "en": "en-US",
  "hi": "hi-IN", 
  "kn": "kn-IN",
  "te": "te-IN",
  "ta": "ta-IN",
}

export function TextToSpeech({ text, language = "en" }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [status, setStatus] = useState<string>("Idle")
  const [translatedText, setTranslatedText] = useState<string>("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [ttsError, setTtsError] = useState<string>("")
  const [ttsMethod, setTtsMethod] = useState<string>("Web Speech API")

  // Get language code for Web Speech API
  const speechLanguageCode = SPEECH_LANGUAGE_MAPPING[language] || "en-US"

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = isMuted ? 0 : volume
    }
  }, [audioElement, volume, isMuted])

  // Load available voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
      console.log("TTS: Available voices:", voices.map(v => `${v.lang} - ${v.name}`))
    }

    // Load voices immediately if available
    loadVoices()
    
    // Also listen for voices loaded event
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  // Translate text when language or text changes
  useEffect(() => {
    const translateTextForTTS = async () => {
      if (language === "en" || !text.trim()) {
        setTranslatedText(text)
        console.log("TTS: No translation needed for English or empty text")
        return
      }

      setIsTranslating(true)
      console.log(`TTS: Starting translation from English to ${language}`)
      console.log(`TTS: Original text: "${text.substring(0, 100)}..."`)
      
      try {
        const translated = await getTranslatedTextForTTS(text, language)
        setTranslatedText(translated)
        console.log(`TTS: Translation successful: "${translated.substring(0, 100)}..."`)
      } catch (error) {
        console.error("TTS: Translation failed:", error)
        setTranslatedText(text) // Fallback to original text
        console.log("TTS: Using fallback to original English text")
      } finally {
        setIsTranslating(false)
      }
    }

    translateTextForTTS()
  }, [text, language])

  // Function to find the best available voice for a language
  const findBestVoice = (targetLanguage: string): SpeechSynthesisVoice | null => {
    if (!availableVoices.length) return null

    // Try to find an exact match first
    const exactMatch = availableVoices.find(v => v.lang === targetLanguage)
    if (exactMatch) return exactMatch

    // Try to find a voice with the same language family
    const langFamily = targetLanguage.split('-')[0]
    const familyMatch = availableVoices.find(v => v.lang.startsWith(langFamily))
    if (familyMatch) return familyMatch

    // Try to find any Indian language voice
    const indianVoices = availableVoices.filter(v => 
      v.lang.includes('IN') || 
      ['hi', 'kn', 'te', 'ta', 'mr', 'gu', 'bn', 'pa', 'or'].some(lang => v.lang.startsWith(lang))
    )
    if (indianVoices.length > 0) return indianVoices[0]

    // Fallback to English
    return availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0]
  }

  // Try Web Speech API
  const tryWebSpeechAPI = (textToSpeak: string, targetLanguage: string): boolean => {
    try {
      // Stop any current speech
      window.speechSynthesis.cancel()

      // Find the best available voice
      const bestVoice = findBestVoice(targetLanguage)
      
      if (!bestVoice) {
        console.log("TTS: No suitable voice found for Web Speech API")
        setTtsError("No suitable voice found for the selected language. Try a different language.")
        return false
      }

      console.log(`TTS: Using Web Speech API with voice: ${bestVoice.name} (${bestVoice.lang})`)

      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.voice = bestVoice
      utterance.lang = bestVoice.lang
      utterance.volume = isMuted ? 0 : volume
      utterance.rate = 0.8 // Slower for better clarity
      utterance.pitch = 1

      utterance.onstart = () => {
        setIsPlaying(true)
        setStatus(`Playing (${bestVoice.lang})...`)
        setTtsError("")
        setTtsMethod("Web Speech API")
        console.log("TTS: Web Speech API started successfully")
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setStatus("Idle")
        console.log("TTS: Web Speech API completed successfully")
      }

      utterance.onerror = (event) => {
        console.error("TTS: Web Speech API error:", event)
        setIsPlaying(false)
        setStatus("Web Speech failed")
        
        let errorMessage = "Web Speech API error"
        if (event.error === 'not-allowed') {
          errorMessage = "Speech synthesis was blocked by the browser. Please check your browser settings."
        } else if (event.error === 'synthesis-failed') {
          errorMessage = "Speech synthesis failed. The browser may not support this language."
        } else if (event.error === 'audio-busy') {
          errorMessage = "Audio is busy. Please wait and try again."
        } else if (event.error === 'voice-unavailable') {
          errorMessage = "Voice is unavailable. Please try a different language."
        } else {
          errorMessage = `Web Speech API error: ${event.error}`
        }
        
        setTtsError(errorMessage)
        return false
      }

      window.speechSynthesis.speak(utterance)
      return true
    } catch (error) {
      console.error("TTS: Web Speech API failed:", error)
      setTtsError("Web Speech API failed. Please try a different language.")
      return false
    }
  }

  // Try gTTS Flask Backend
  const tryGTTSBackend = async (textToSpeak: string, targetLanguage: string): Promise<boolean> => {
    setStatus("Trying gTTS Backend...")
    
    try {
      console.log("TTS: Trying gTTS Flask Backend...")
      
      // First check if backend is running
      try {
        const healthResponse = await fetch('http://localhost:5000/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!healthResponse.ok) {
          throw new Error("Flask backend is not running. Please start it with: cd backend && python app.py")
        }
      } catch (healthError) {
        throw new Error("Flask backend is not running. Please start it with: cd backend && python app.py")
      }
      
      // Convert language code to simple format (e.g., "hi-IN" -> "hi")
      const simpleLanguageCode = language.split('-')[0]
      console.log(`TTS: Using language code: ${simpleLanguageCode} (original: ${language})`)
      
      const response = await fetch('http://localhost:5000/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSpeak,
          language: simpleLanguageCode // Use simple language code
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `gTTS Backend request failed: ${response.status}`)
      }

      // Get the audio blob
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      // Create and configure audio element
      const newAudioElement = new Audio(audioUrl)
      newAudioElement.volume = isMuted ? 0 : volume
      
      newAudioElement.onloadstart = () => {
        setIsPlaying(true)
        setStatus(`Playing (gTTS - ${simpleLanguageCode})...`)
        setTtsError("")
        setTtsMethod(`gTTS Flask Backend (${simpleLanguageCode})`)
        console.log(`TTS: gTTS Backend started successfully with language: ${simpleLanguageCode}`)
      }

      newAudioElement.onended = () => {
        setIsPlaying(false)
        setStatus("Idle")
        URL.revokeObjectURL(audioUrl)
        console.log("TTS: gTTS Backend completed successfully")
      }

      newAudioElement.onerror = (error) => {
        console.error("TTS: gTTS Backend audio error:", error)
        setIsPlaying(false)
        setStatus("gTTS Backend failed")
        setTtsError("gTTS Backend audio playback failed")
        URL.revokeObjectURL(audioUrl)
      }

      setAudioElement(newAudioElement)
      newAudioElement.play()
      return true

    } catch (error) {
      console.error("TTS: gTTS Backend failed:", error)
      setTtsError(`gTTS Backend error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return false
    }
  }

  // Try alternative TTS service (placeholder for future implementation)
  const tryAlternativeTTS = async (textToSpeak: string, targetLanguage: string): Promise<boolean> => {
    setStatus("Trying alternative TTS...")
    
    try {
      // This is a placeholder for future free TTS services
      // For now, we'll just return false to indicate failure
      console.log("TTS: Alternative TTS not yet implemented")
      
      return false
    } catch (error) {
      console.error("TTS: Alternative TTS failed:", error)
      return false
    }
  }

  const startTTS = async (textToSpeak: string, targetLanguage: string) => {
    setTtsError("")
    
    // For Indian languages (non-English), skip Web Speech API and go directly to gTTS
    if (language !== "en") {
      console.log("TTS: Non-English language detected, using gTTS Backend directly...")
      setStatus("Using gTTS Backend for Indian language...")
      
      const gttsSuccess = await tryGTTSBackend(textToSpeak, targetLanguage)
      
      if (gttsSuccess) {
        return
      }
      
      console.log("TTS: gTTS Backend failed, trying Web Speech API as fallback...")
      const webSpeechSuccess = tryWebSpeechAPI(textToSpeak, targetLanguage)
      
      if (webSpeechSuccess) {
        return
      }
    } else {
      // For English, try Web Speech API first (it's free and built into browsers)
      console.log("TTS: English detected, trying Web Speech API first...")
      const webSpeechSuccess = tryWebSpeechAPI(textToSpeak, targetLanguage)
      
      if (webSpeechSuccess) {
        return
      }
      
      console.log("TTS: Web Speech API failed, trying gTTS Backend...")
      const gttsSuccess = await tryGTTSBackend(textToSpeak, targetLanguage)
      
      if (gttsSuccess) {
        return
      }
    }
    
    console.log("TTS: All methods failed, trying alternative TTS...")
    
    // Try alternative TTS service as last resort
    const alternativeSuccess = await tryAlternativeTTS(textToSpeak, targetLanguage)
    
    if (!alternativeSuccess) {
      setStatus("All TTS methods failed")
      setTtsError("TTS failed for this language. Please check your browser settings and ensure the Flask backend is running.")
      
      // Show helpful suggestions
      if (language !== "en") {
        setTtsError(prev => prev + " For Indian languages, make sure the Flask backend is running on port 5000.")
      }
    }
  }

  const togglePlay = async () => {
    if (isPlaying) {
      if (audioElement) {
        audioElement.pause()
        setIsPlaying(false)
        setStatus("Paused")
      } else {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        setStatus("Stopped")
      }
    } else {
      // Use translated text for TTS
      const textToSpeak = translatedText || text
      await startTTS(textToSpeak, speechLanguageCode)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  // Handle mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Get current TTS method info
  const getTTSMethodInfo = () => {
    return ttsMethod
  }

  // Get voice info for display
  const getVoiceInfo = () => {
    if (ttsMethod === "Web Speech API") {
      const bestVoice = findBestVoice(speechLanguageCode)
      return bestVoice ? `${bestVoice.lang} (${bestVoice.name})` : "No voice found"
    }
    return ttsMethod
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {ttsError && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{ttsError}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            disabled={!text || status === "Trying alternative TTS..." || isTranslating}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="icon" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <div className="flex-1">
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              aria-label="Volume"
            />
          </div>

          <div className="text-xs text-muted-foreground flex flex-col items-end">
            <div>Language: {language}</div>
            <div className="text-xs opacity-70 max-w-32 truncate" title={status}>
              Status: {isTranslating ? "Translating..." : status}
            </div>
            <div className="text-xs opacity-60 max-w-32 truncate" title={getVoiceInfo()}>
              Voice: {getVoiceInfo()}
            </div>
            {language !== "en" && translatedText && (
              <div className="text-xs opacity-50 max-w-32 truncate" title={translatedText}>
                Translated: {translatedText.substring(0, 30)}...
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
