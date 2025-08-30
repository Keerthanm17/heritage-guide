"use client"

import { useState, useEffect } from "react"
import { Languages, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface TranslatedContent {
  name: string
  description: string
  location: string
  method?: string
}

interface LanguagePreviewProps {
  monumentId: string
  monumentName: string
  originalDescription?: string
  originalLocation?: string
}

const LANGUAGES = {
  hi: { name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  te: { name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  kn: { name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
  ta: { name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
}

export function LanguagePreview({ 
  monumentId, 
  monumentName, 
  originalDescription = "",
  originalLocation = ""
}: LanguagePreviewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [translatedContent, setTranslatedContent] = useState<TranslatedContent | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()

  const handleLanguageSelect = async (language: string) => {
    if (!language || language === "en") return

    setSelectedLanguage(language)
    setIsTranslating(true)
    setTranslatedContent(null)

    try {
      const response = await fetch(`/api/translate?monumentId=${monumentId}&language=${language}`)
      const data = await response.json()

      if (data.success || data.name) {
        setTranslatedContent({
          name: data.name || monumentName,
          description: data.description || originalDescription,
          location: data.location || originalLocation,
          method: data.method
        })

        if (data.success) {
          const methodMessages: Record<string, string> = {
            manual: "High-quality manual translation",
            libretranslate: "AI-powered translation", 
            fallback: "Limited translation available"
          }

          toast({
            title: "Translation complete",
            description: methodMessages[data.method] || "Content translated successfully",
          })
        }
      } else {
        throw new Error(data.error || "Translation failed")
      }
    } catch (error) {
      console.error("Translation error:", error)
      toast({
        title: "Translation failed",
        description: "Unable to translate content. Please try again.",
        variant: "destructive",
      })
      setSelectedLanguage("")
    } finally {
      setIsTranslating(false)
    }
  }

  const getMethodBadge = (method?: string) => {
    switch (method) {
      case "manual":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />High Quality</Badge>
      case "libretranslate":
        return <Badge variant="secondary"><Languages className="w-3 h-3 mr-1" />AI Translated</Badge>
      case "fallback":
        return <Badge variant="outline"><AlertTriangle className="w-3 h-3 mr-1" />Limited</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Languages className="h-5 w-5 text-blue-500" />
          Quick Language Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            value={selectedLanguage}
            onValueChange={handleLanguageSelect}
            disabled={isTranslating}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select language to preview" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([code, lang]) => (
                <SelectItem key={code} value={code}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                    <span className="text-muted-foreground">({lang.native})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedLanguage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedLanguage("")
                setTranslatedContent(null)
              }}
              disabled={isTranslating}
            >
              Clear
            </Button>
          )}
        </div>

        {isTranslating && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-blue-700">
              Translating to {LANGUAGES[selectedLanguage as keyof typeof LANGUAGES]?.name}...
            </span>
          </div>
        )}

        {translatedContent && selectedLanguage && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-muted-foreground">
                {LANGUAGES[selectedLanguage as keyof typeof LANGUAGES]?.flag} {" "}
                {LANGUAGES[selectedLanguage as keyof typeof LANGUAGES]?.name} Preview
              </h4>
              {getMethodBadge(translatedContent.method)}
            </div>
            
            <div className="space-y-2">
              <div>
                <h3 className="font-bold text-lg text-primary">{translatedContent.name}</h3>
              </div>
              
              {translatedContent.location && (
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{translatedContent.location}</p>
                </div>
              )}
              
              {translatedContent.description && (
                <div>
                  <p className="text-sm text-gray-700 line-clamp-3">{translatedContent.description}</p>
                </div>
              )}
            </div>

            <div className="text-xs text-muted-foreground pt-2 border-t">
              💡 View full details to see complete translation with audio guide
            </div>
          </div>
        )}

        {!selectedLanguage && (
          <div className="text-center p-4 text-sm text-muted-foreground">
            Select a language above to see a quick preview of translated content
          </div>
        )}
      </CardContent>
    </Card>
  )
}
