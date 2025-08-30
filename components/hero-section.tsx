"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Search, MapPin, Sparkles, Volume2 } from "lucide-react"
import Link from "next/link"
import { TextToSpeech } from "@/components/text-to-speech"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSection() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  
  const heroText = {
    en: "Upload any monument photo and instantly discover its history, architecture, and cultural significance with our advanced AI recognition system",
    hi: "किसी भी स्मारक की तस्वीर अपलोड करें और हमारी उन्नत AI पहचान प्रणाली के साथ तुरंत इसका इतिहास, वास्तुकला और सांस्कृतिक महत्व खोजें",
    kn: "ಯಾವುದೇ ಸ್ಮಾರಕದ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ನಮ್ಮ ಸುಧಾರಿತ AI ಗುರುತಿಸುವಿಕೆ ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ತಕ್ಷಣವೇ ಅದರ ಇತಿಹಾಸ, ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪ್ರಾಮುಖ್ಯತೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
    te: "ఏదైనా స్మారక చిత్రాన్ని అప్‌లోడ్ చేసి మా అధునాతన AI గుర్తింపు వ్యవస్థతో దాని చరిత్ర, నిర్మాణ శాస్త్రం మరియు సాంస్కృతిక ప్రాముఖ్యతను తక్షణం కనుగొనండి",
    ta: "எந்தவொரு நினைவுச்சின்ன புகைப்படத்தையும் பதிவேற்றி, எங்கள் மேம்பட்ட AI அங்கீகார அமைப்புடன் அதன் வரலாறு, கட்டிடக்கலை மற்றும் கலாச்சார முக்கியத்துவத்தை உடனடியாக கண்டறியவும்"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/indian-heritage-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-300/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-medium text-orange-100">AI-Powered Heritage Recognition</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover India's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Heritage Treasures
            </span>
          </h1>

          {/* Subtitle with TTS */}
          <div className="mb-8 max-w-3xl mx-auto">
           
            
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              {heroText[selectedLanguage as keyof typeof heroText] || heroText.en}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="#upload">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Recognition
              </Button>
            </Link>

            <Link href="/compare">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 bg-transparent"
              >
                <Search className="mr-2 h-5 w-5" />
                Compare Monuments
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Camera className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Instant Recognition</h3>
              <p className="text-gray-300 text-sm">
                Upload any monument photo for immediate identification and detailed information
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">28+ Monuments</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive database covering India's most iconic heritage sites
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Sparkles className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Historical Chat</h3>
              <p className="text-gray-300 text-sm">Chat with historical figures and learn fascinating stories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
