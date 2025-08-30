"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { translateTextWithGemini, TTS_LANGUAGE_MAPPING } from "@/lib/translation"

export function TranslationTest() {
  const [inputText, setInputText] = useState("Hello, this is a test of the translation system.")
  const [targetLanguage, setTargetLanguage] = useState("kn")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState("")

  const testTranslation = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    setError("")
    setTranslatedText("")

    try {
      const translated = await translateTextWithGemini(inputText, targetLanguage)
      setTranslatedText(translated)
      console.log("Translation successful:", translated)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      console.error("Translation failed:", err)
    } finally {
      setIsTranslating(false)
    }
  }

  const testGeminiAPI = async () => {
    setIsTranslating(true)
    setError("")
    setTranslatedText("")

    try {
      const response = await fetch("/api/test-gemini")
      const data = await response.json()
      
      if (data.success) {
        setTranslatedText(`API Test Successful!\nOriginal: ${data.original}\nTranslated: ${data.translated}`)
        console.log("Gemini API test successful:", data)
      } else {
        setError(`API Test Failed: ${data.error}`)
        console.error("Gemini API test failed:", data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(`API Test Error: ${errorMessage}`)
      console.error("Gemini API test error:", err)
    } finally {
      setIsTranslating(false)
    }
  }

  const getLanguageName = (code: string) => {
    const names: Record<string, string> = {
      en: "English",
      hi: "Hindi",
      kn: "Kannada",
      te: "Telugu",
      ta: "Tamil",
    }
    return names[code] || code
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Translation Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Target Language</label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
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
              {TTS_LANGUAGE_MAPPING[targetLanguage] || "en-US"}
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Input Text (English)</label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter English text to translate..."
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={testTranslation} 
            disabled={isTranslating || !inputText.trim()}
            className="flex-1"
          >
            {isTranslating ? "Translating..." : "Test Translation"}
          </Button>
          <Button 
            onClick={testGeminiAPI} 
            disabled={isTranslating}
            variant="outline"
          >
            Test Gemini API
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">Error: {error}</p>
          </div>
        )}

        {translatedText && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Translated Text</label>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">{translatedText}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {getLanguageName(targetLanguage)}
              </Badge>
              <Badge variant="secondary">
                {TTS_LANGUAGE_MAPPING[targetLanguage]}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
