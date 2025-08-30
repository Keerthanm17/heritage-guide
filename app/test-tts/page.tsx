"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { TTS_LANGUAGE_MAPPING } from "@/lib/translation"
import { TranslationTest } from "@/components/translation-test"

interface Voice {
  voiceURI: string
  name: string
  lang: string
  localService: boolean
  default: boolean
}

export default function TestTTSPage() {
  const [voices, setVoices] = useState<Voice[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [testText, setTestText] = useState("Hello, this is a test of text-to-speech in different languages.")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVoice, setCurrentVoice] = useState<Voice | null>(null)
  const [status, setStatus] = useState("Ready")

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
      console.log("Available voices:", availableVoices)
    }

    // Load voices immediately if available
    loadVoices()
    
    // Also listen for voices loaded event
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const findBestVoice = (targetLanguage: string): Voice | null => {
    if (!voices.length) return null

    // First try to find an exact match
    let voice = voices.find(v => v.lang === targetLanguage)
    if (voice) return voice

    // Try to find a voice with the same language family (e.g., "hi" for "hi-IN")
    const langFamily = targetLanguage.split('-')[0]
    voice = voices.find(v => v.lang.startsWith(langFamily))
    if (voice) return voice

    // Try to find any Indian language voice
    const indianVoices = voices.filter(v => 
      v.lang.includes('IN') || 
      ['hi', 'kn', 'te', 'ta', 'mr', 'gu', 'bn', 'pa', 'or'].some(lang => v.lang.startsWith(lang))
    )
    if (indianVoices.length > 0) return indianVoices[0]

    // Fallback to English
    return voices.find(v => v.lang.startsWith('en')) || voices[0]
  }

  const testTTS = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setStatus("Stopped")
      return
    }

    const targetLanguage = TTS_LANGUAGE_MAPPING[selectedLanguage] || "en-US"
    const bestVoice = findBestVoice(targetLanguage)

    if (!bestVoice) {
      setStatus("No suitable voice found")
      return
    }

    setCurrentVoice(bestVoice)
    setStatus("Playing...")
    setIsPlaying(true)

    // Stop any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(testText)
    utterance.voice = bestVoice
    utterance.lang = bestVoice.lang
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => {
      setStatus("Playing...")
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setStatus("Completed")
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsPlaying(false)
      setStatus(`Error: ${event.error}`)
    }

    window.speechSynthesis.speak(utterance)
  }

  const getLanguageName = (code: string) => {
    const names: Record<string, string> = {
      en: "English",
      hi: "Hindi",
      kn: "Kannada",
      te: "Telugu",
      ta: "Tamil",
      mr: "Marathi",
      gu: "Gujarati",
      bn: "Bengali",
      pa: "Punjabi",
      or: "Odia"
    }
    return names[code] || code
  }

  const getVoiceCountForLanguage = (langCode: string) => {
    const langFamily = langCode.split('-')[0]
    return voices.filter(v => v.lang.startsWith(langFamily)).length
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Translation Test</CardTitle>
        </CardHeader>
        <CardContent>
          <TranslationTest />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TTS_LANGUAGE_MAPPING).map(([code, ttsCode]) => (
                    <SelectItem key={code} value={code}>
                      {getLanguageName(code)} ({code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">TTS Language Code</label>
              <div className="p-2 bg-muted rounded-md text-sm">
                {TTS_LANGUAGE_MAPPING[selectedLanguage] || "en-US"}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Test Text</label>
            <Textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Enter text to test TTS..."
              rows={3}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={testTTS} disabled={!voices.length}>
              {isPlaying ? "Stop" : "Test TTS"}
            </Button>
            <Badge variant={isPlaying ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>

          {currentVoice && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">
                <strong>Current Voice:</strong> {currentVoice.name} ({currentVoice.lang})
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Browser Voices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Total voices: {voices.length}
            </p>
            {voices.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {voices.map((voice, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div>
                      <span className="font-medium">{voice.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {voice.lang}
                      </Badge>
                      {voice.default && (
                        <Badge variant="default" className="ml-2">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {voice.localService ? "Local" : "Remote"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No voices available</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language Support Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(TTS_LANGUAGE_MAPPING).map(([code, ttsCode]) => (
              <div key={code} className="text-center p-3 bg-muted rounded-md">
                <div className="font-medium">{getLanguageName(code)}</div>
                <div className="text-sm text-muted-foreground">{code}</div>
                <Badge variant="outline" className="mt-1">
                  {getVoiceCountForLanguage(ttsCode)} voices
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TTS Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Azure Speech Service</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Best quality for Indian languages
                </p>
                <Badge variant="outline" className="text-xs">
                  Requires API Key
                </Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">ElevenLabs</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Good for English, limited for Indian
                </p>
                <Badge variant="outline" className="text-xs">
                  Requires API Key
                </Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Browser TTS</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Limited support, always available
                </p>
                <Badge variant="secondary" className="text-xs">
                  Built-in
                </Badge>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Setup Instructions</h4>
              <p className="text-sm text-blue-700 mb-2">
                To get the best Indian language TTS support:
              </p>
              <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                <li>Get Azure Speech Service API key from Azure Portal</li>
                <li>Add AZURE_SPEECH_KEY and AZURE_SPEECH_REGION to .env.local</li>
                <li>Restart your development server</li>
              </ol>
              <p className="text-xs text-blue-600 mt-2">
                See TTS_SETUP_GUIDE.md for detailed instructions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
