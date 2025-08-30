"use client"

import { Camera, Info, Headphones, Globe, MessageCircle, Sparkles } from "lucide-react"
import { TextToSpeech } from "@/components/text-to-speech"

export function Features() {
  const features = [
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "AI Monument Recognition",
      description:
        "Upload photos of 28+ Indian monuments including UNESCO sites and Karnataka's heritage gems for instant identification.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Info className="h-10 w-10 text-primary" />,
      title: "Comprehensive Information",
      description: "Get detailed historical facts, architectural insights, and cultural significance of each monument.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <Headphones className="h-10 w-10 text-primary" />,
      title: "Audio Heritage Guides",
      description:
        "Listen to monument information with our advanced text-to-speech feature in multiple Indian languages.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Multilingual Support",
      description: "Access content in English, Hindi, Kannada, Telugu, and Tamil for inclusive heritage exploration.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      title: "Smart Heritage Chatbot",
      description:
        "Ask questions and get instant, intelligent answers about any monument's history, architecture, and visiting tips.",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Interactive Experience",
      description:
        "Enjoy quick questions, fun facts, and engaging conversations about India's magnificent heritage sites.",
      gradient: "from-indigo-500 to-blue-600",
    },
  ]

  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Heritage with
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Advanced Technology
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience India's monuments like never before with AI-powered recognition, multilingual support, and
            interactive heritage guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl p-6 content-container hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed mb-4">{feature.description}</p>
                
                {/* TTS Button */}
                <div className="flex justify-center">
                  <TextToSpeech 
                    text={`${feature.title}. ${feature.description}`}
                    language="en"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Monument statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">28+</div>
            <div className="text-sm text-gray-300">Monuments</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">10</div>
            <div className="text-sm text-gray-300">UNESCO Sites</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">13</div>
            <div className="text-sm text-gray-300">Karnataka Gems</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">English</div>
            <div className="text-sm text-gray-300">Language</div>
          </div>
        </div>
      </div>
    </section>
  )
}
