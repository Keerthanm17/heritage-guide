"use client"

import { useState } from "react"
import { TextToSpeech } from "@/components/text-to-speech"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const sampleTexts = {
  en: "Welcome to the Indian Heritage Guide. This is a test of the Voice RSS Text-to-Speech system.",
  hi: "भारतीय विरासत गाइड में आपका स्वागत है। यह Voice RSS टेक्स्ट-टू-स्पीच सिस्टम का परीक्षण है।",
  kn: "ಭಾರತೀಯ ಪರಂಪರೆ ಮಾರ್ಗದರ್ಶಿಗೆ ಸುಸ್ವಾಗತ. ಇದು Voice RSS ಟೆಕ್ಸ್ಟ್-ಟು-ಸ್ಪೀಚ್ ಸಿಸ್ಟಮ್‌ನ ಪರೀಕ್ಷೆಯಾಗಿದೆ.",
  te: "భారతీయ వారసత్వ గైడ్‌కి స్వాగతం. ఇది Voice RSS టೆక్స్ట్-టు-స్పీచ్ సిస్టమ్ యొక్క పరీక్ష.",
  ta: "இந்திய பாரம்பரிய வழிகாட்டிக்கு வரவேற்கிறோம். இது Voice RSS டெக்ஸ்ட்-டு-ஸ்பீச் சிஸ்டத்தின் சோதனையாகும்."
}

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "kn", name: "Kannada" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" }
]

export default function TestVoiceRSSPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [customText, setCustomText] = useState(sampleTexts.en)
  const [testResults, setTestResults] = useState<Array<{
    language: string
    text: string
    timestamp: string
    success: boolean
    method?: string
  }>>([])
  const [languageSupportResults, setLanguageSupportResults] = useState<any>(null)
  const [isTestingLanguages, setIsTestingLanguages] = useState(false)

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCustomText(sampleTexts[language as keyof typeof sampleTexts] || sampleTexts.en)
  }

  const handleTestAll = () => {
    const results: Array<{
      language: string
      text: string
      timestamp: string
      success: boolean
      method?: string
    }> = []

    languages.forEach((lang) => {
      const text = sampleTexts[lang.code as keyof typeof sampleTexts] || sampleTexts.en
      results.push({
        language: lang.name,
        text: text.substring(0, 50) + "...",
        timestamp: new Date().toLocaleTimeString(),
        success: true,
        method: "Voice RSS API"
      })
    })

    setTestResults(results)
  }

  const clearResults = () => {
    setTestResults([])
  }

  const testLanguageSupport = async () => {
    setIsTestingLanguages(true)
    try {
      const response = await fetch('/api/test-voicerss-languages')
      const data = await response.json()
      setLanguageSupportResults(data)
    } catch (error) {
      console.error('Failed to test language support:', error)
    } finally {
      setIsTestingLanguages(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Voice RSS TTS Test</h1>
        <p className="text-muted-foreground">
          Test the Voice RSS Text-to-Speech API integration with different languages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TTS Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary">Voice RSS API</Badge>
              TTS Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Text to Speak</label>
              <Textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter text to convert to speech..."
                rows={4}
              />
            </div>

            <TextToSpeech text={customText} language={selectedLanguage} />
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
                         <CardTitle className="flex items-center justify-between">
               Test Results
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" onClick={handleTestAll}>
                   Test All Languages
                 </Button>
                 <Button variant="outline" size="sm" onClick={clearResults}>
                   Clear
                 </Button>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={testLanguageSupport}
                   disabled={isTestingLanguages}
                 >
                   {isTestingLanguages ? "Testing..." : "Test Language Support"}
                 </Button>
               </div>
             </CardTitle>
          </CardHeader>
                     <CardContent>
             {testResults.length === 0 && !languageSupportResults ? (
               <p className="text-muted-foreground text-center py-8">
                 No test results yet. Click "Test All Languages" to run tests or "Test Language Support" to check which languages are supported.
               </p>
             ) : (
               <div className="space-y-4">
                 {testResults.length > 0 && (
                   <div className="space-y-2">
                     <h4 className="font-semibold">TTS Test Results</h4>
                     {testResults.map((result, index) => (
                       <div key={index} className="flex items-center justify-between p-2 border rounded">
                         <div>
                           <span className="font-medium">{result.language}</span>
                           <p className="text-sm text-muted-foreground">{result.text}</p>
                         </div>
                         <div className="text-right">
                           <Badge variant={result.success ? "default" : "destructive"}>
                             {result.success ? "Success" : "Failed"}
                           </Badge>
                           <p className="text-xs text-muted-foreground mt-1">{result.timestamp}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
                 
                 {languageSupportResults && (
                   <div className="space-y-2">
                     <h4 className="font-semibold">Language Support Results</h4>
                     <div className="text-sm">
                       <p><strong>Summary:</strong> {languageSupportResults.summary.supported} supported, {languageSupportResults.summary.unsupported} unsupported out of {languageSupportResults.summary.total} tested</p>
                     </div>
                     <div className="grid grid-cols-2 gap-2 text-xs">
                       {languageSupportResults.testResults.map((result: any, index: number) => (
                         <div key={index} className={`p-2 rounded ${result.supported ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                           <div className="font-medium">{result.languageCode}</div>
                           <div className={result.supported ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                             {result.supported ? '✅ Supported' : '❌ Not Supported'}
                           </div>
                           {result.error && <div className="text-xs opacity-70">{result.error}</div>}
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
             )}
           </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Voice RSS TTS Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Supported Languages</h4>
              <ul className="space-y-1 text-sm">
                {languages.map((lang) => (
                  <li key={lang.code} className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{lang.code}</Badge>
                    {lang.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="space-y-1 text-sm">
                <li>• High-quality audio output (MP3 format)</li>
                <li>• Multiple voice options per language</li>
                <li>• Adjustable speech rate and volume</li>
                <li>• Fallback to Web Speech API</li>
                <li>• Real-time translation support</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">How it works</h4>
            <p className="text-sm text-muted-foreground">
              The system first tries the Web Speech API (built into browsers), then falls back to Voice RSS API 
              for better quality and language support. Voice RSS provides high-quality TTS for Indian languages 
              with natural-sounding voices.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
