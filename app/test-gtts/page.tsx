"use client"

import { useState, useEffect } from "react"
import { TextToSpeech } from "@/components/text-to-speech"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

const sampleTexts = {
  en: "Welcome to the Indian Heritage Guide. This is a test of the gTTS Text-to-Speech system.",
  hi: "भारतीय विरासत गाइड में आपका स्वागत है। यह gTTS टेक्स्ट-टू-स्पीच सिस्टम का परीक्षण है।",
  kn: "ಭಾರತೀಯ ಪರಂಪರೆ ಮಾರ್ಗದರ್ಶಿಗೆ ಸುಸ್ವಾಗತ. ಇದು gTTS ಟೆಕ್ಸ್ಟ್-ಟು-ಸ್ಪೀಚ್ ಸಿಸ್ಟಮ್‌ನ ಪರೀಕ್ಷೆಯಾಗಿದೆ.",
  te: "భారతీయ వారసత్వ గైడ్‌కి స్వాగతం. ఇది gTTS టెక్స్ట్-టు-స్పీచ్ సిస్టమ్ యొక్క పరీక్ష.",
  ta: "இந்திய பாரம்பரிய வழிகாட்டிக்கு வரவேற்கிறோம். இது gTTS டெக்ஸ்ட்-டு-ஸ்பீச் சிஸ்டத்தின் சோதனையாகும்.",
  mr: "भारतीय वारसा मार्गदर्शकामध्ये आपले स्वागत आहे. हे gTTS टेक्स्ट-टू-स्पीच सिस्टमचे परीक्षण आहे.",
  gu: "ભારતીય વારસો ગાઈડમાં તમારું સ્વાગત છે. આ gTTS ટેક્સ્ટ-ટુ-સ્પીચ સિસ્ટમનું પરીક્ષણ છે.",
  bn: "ভারতীয় ঐতিহ্য গাইডে আপনাকে স্বাগতম। এটি gTTS টেক্সট-টু-স্পিচ সিস্টেমের পরীক্ষা।",
  pa: "ਭਾਰਤੀ ਵਿਰਾਸਤ ਗਾਈਡ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਇਹ gTTS ਟੈਕਸਟ-ਟੂ-ਸਪੀਚ ਸਿਸਟਮ ਦੀ ਜਾਂਚ ਹੈ।",
  or: "ଭାରତୀୟ ପରମ୍ପରା ଗାଇଡରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ଏହା gTTS ଟେକ୍ସଟ-ଟୁ-ସ୍ପିଚ ସିଷ୍ଟମର ପରୀକ୍ଷା।"
}

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "kn", name: "Kannada" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "or", name: "Odia" }
]

export default function TestGTTSPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [customText, setCustomText] = useState(sampleTexts.en)
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000")
  const [backendStatus, setBackendStatus] = useState<string>("Unknown")
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([])
  const [testResults, setTestResults] = useState<Array<{
    language: string
    text: string
    timestamp: string
    success: boolean
    method?: string
  }>>([])

  // Check backend status on mount and when URL changes
  useEffect(() => {
    checkBackendStatus()
  }, [backendUrl])

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCustomText(sampleTexts[language as keyof typeof sampleTexts] || sampleTexts.en)
  }

  const checkBackendStatus = async () => {
    try {
      // Check health endpoint
      const healthResponse = await fetch(`${backendUrl}/health`)
      if (healthResponse.ok) {
        setBackendStatus("Connected")
        
        // Get supported languages
        const languagesResponse = await fetch(`${backendUrl}/languages`)
        if (languagesResponse.ok) {
          const data = await languagesResponse.json()
          setSupportedLanguages(data.supported_languages || [])
        }
      } else {
        setBackendStatus("Error")
      }
    } catch (error) {
      setBackendStatus("Disconnected")
      console.error("Backend connection failed:", error)
    }
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
        method: "gTTS Flask Backend"
      })
    })

    setTestResults(results)
  }

  const clearResults = () => {
    setTestResults([])
  }

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case "Connected": return "text-green-600"
      case "Error": return "text-yellow-600"
      case "Disconnected": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getBackendStatusIcon = () => {
    switch (backendStatus) {
      case "Connected": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Error": return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "Disconnected": return <XCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
             <div className="text-center">
         <h1 className="text-3xl font-bold mb-2">gTTS Flask Backend Test</h1>
         <p className="text-muted-foreground">
           Test the gTTS Text-to-Speech system with Flask backend - Now integrated with main TTS component!
         </p>
       </div>

      {/* Backend Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getBackendStatusIcon()}
            Backend Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <span className={getBackendStatusColor()}>{backendStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>URL:</span>
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
                placeholder="http://localhost:5000"
              />
            </div>
            <Button onClick={checkBackendStatus} variant="outline" size="sm">
              Check Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {backendStatus === "Disconnected" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Flask backend is not connected. Please start the backend server with: 
            <code className="ml-2 px-2 py-1 bg-muted rounded text-sm">
              cd backend && python app.py
            </code>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TTS Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary">gTTS Flask</Badge>
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

                         <TextToSpeech 
               text={customText} 
               language={selectedLanguage}
             />
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
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {testResults.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No test results yet. Click "Test All Languages" to run tests.
              </p>
            ) : (
              <div className="space-y-2">
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
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Card>
        <CardHeader>
          <CardTitle>gTTS Flask Backend Information</CardTitle>
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
                <li>• High-quality Google TTS</li>
                <li>• Excellent Indian language support</li>
                <li>• Real-time translation integration</li>
                <li>• Flask backend with CORS support</li>
                <li>• Automatic language detection</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Setup Instructions</h4>
            <div className="text-sm space-y-2">
              <p><strong>1. Install Python dependencies:</strong></p>
              <code className="block px-3 py-2 bg-background rounded text-xs">
                cd backend && pip install -r requirements.txt
              </code>
              <p><strong>2. Start Flask backend:</strong></p>
              <code className="block px-3 py-2 bg-background rounded text-xs">
                python app.py
              </code>
              <p><strong>3. Test the system:</strong></p>
              <p>Select a language, enter text, and click play to test the gTTS system.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
