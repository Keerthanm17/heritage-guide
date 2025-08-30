"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getTranslatedTextForTTS } from "@/lib/translation"

interface GTTSProps {
  text: string
  language?: string
  backendUrl?: string
}

export function GTTSTextToSpeech({ 
  text, 
  language = "en", 
  backendUrl = "http://localhost:5000" 
}: GTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [status, setStatus] = useState<string>("Idle")
  const [translatedText, setTranslatedText] = useState<string>("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [ttsError, setTtsError] = useState<string>("")
  const [backendStatus, setBackendStatus] = useState<string>("Unknown")

  // Check backend health on component mount
  useEffect(() => {
    checkBackendHealth()
  }, [backendUrl])

  // Update audio volume when it changes
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = isMuted ? 0 : volume
    }
  }, [audioElement, volume, isMuted])

  // Translate text when language or text changes
  useEffect(() => {
    const translateTextForTTS = async () => {
      if (language === "en" || !text.trim()) {
        setTranslatedText(text)
        console.log("gTTS: No translation needed for English or empty text")
        return
      }

      setIsTranslating(true)
      console.log(`gTTS: Starting translation from English to ${language}`)
      console.log(`gTTS: Original text: "${text.substring(0, 100)}..."`)
      
      try {
        const translated = await getTranslatedTextForTTS(text, language)
        setTranslatedText(translated)
        console.log(`gTTS: Translation successful: "${translated.substring(0, 100)}..."`)
      } catch (error) {
        console.error("gTTS: Translation failed:", error)
        setTranslatedText(text) // Fallback to original text
        console.log("gTTS: Using fallback to original English text")
      } finally {
        setIsTranslating(false)
      }
    }

    translateTextForTTS()
  }, [text, language])

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${backendUrl}/health`)
      if (response.ok) {
        setBackendStatus("Connected")
        console.log("gTTS: Backend is healthy")
      } else {
        setBackendStatus("Error")
        console.log("gTTS: Backend health check failed")
      }
    } catch (error) {
      setBackendStatus("Disconnected")
      console.log("gTTS: Backend is not reachable")
    }
  }

  const generateAndPlayTTS = async (textToSpeak: string, targetLanguage: string) => {
    setIsLoading(true)
    setTtsError("")
    setStatus("Generating audio...")

    try {
      console.log(`gTTS: Requesting TTS for language: ${targetLanguage}`)
      console.log(`gTTS: Text: "${textToSpeak.substring(0, 100)}..."`)

      const response = await fetch(`${backendUrl}/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSpeak,
          language: targetLanguage
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      // Get the audio blob
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      // Create and configure audio element
      const newAudioElement = new Audio(audioUrl)
      newAudioElement.volume = isMuted ? 0 : volume
      
      newAudioElement.onloadstart = () => {
        setIsPlaying(true)
        setIsLoading(false)
        setStatus("Playing...")
        setTtsError("")
        console.log("gTTS: Audio started playing")
      }

      newAudioElement.onended = () => {
        setIsPlaying(false)
        setStatus("Idle")
        URL.revokeObjectURL(audioUrl)
        console.log("gTTS: Audio playback completed")
      }

      newAudioElement.onerror = (error) => {
        console.error("gTTS: Audio playback error:", error)
        setIsPlaying(false)
        setIsLoading(false)
        setStatus("Playback failed")
        setTtsError("Audio playback failed")
        URL.revokeObjectURL(audioUrl)
      }

      setAudioElement(newAudioElement)
      newAudioElement.play()

    } catch (error) {
      console.error("gTTS: TTS generation failed:", error)
      setIsLoading(false)
      setStatus("Generation failed")
      setTtsError(`TTS generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const togglePlay = async () => {
    if (isPlaying) {
      if (audioElement) {
        audioElement.pause()
        setIsPlaying(false)
        setStatus("Paused")
      }
    } else {
      // Use translated text for TTS
      const textToSpeak = translatedText || text
      await generateAndPlayTTS(textToSpeak, language)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case "Connected": return "text-green-600"
      case "Error": return "text-yellow-600"
      case "Disconnected": return "text-red-600"
      default: return "text-gray-600"
    }
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
            disabled={!text || isLoading || isTranslating || backendStatus !== "Connected"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMute} 
            aria-label={isMuted ? "Unmute" : "Mute"}
            disabled={!audioElement}
          >
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
              disabled={!audioElement}
            />
          </div>

          <div className="text-xs text-muted-foreground flex flex-col items-end">
            <div>Language: {language}</div>
            <div className={`text-xs ${getBackendStatusColor()}`}>
              Backend: {backendStatus}
            </div>
            <div className="text-xs opacity-70 max-w-32 truncate" title={status}>
              Status: {isTranslating ? "Translating..." : isLoading ? "Loading..." : status}
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
