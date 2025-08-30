import { Suspense } from "react"
import { ImageUploader } from "@/components/image-uploader"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { PopularMonuments } from "@/components/popular-monuments"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Building, Info } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Discover Indian Monuments</h2>
        <p className="text-center text-gray-200 mb-8 max-w-2xl mx-auto">
          Upload a photo of any Indian monument and get detailed information, audio guides, and the ability to ask
          questions about it in multiple languages.
        </p>

        <div className="max-w-4xl mx-auto" id="upload">
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading uploader...</div>}>
            <ImageUploader />
          </Suspense>
        </div>

        <div className="mt-16">
          <PopularMonuments />
        </div>

        {/* Monument Comparison Section */}
        <section className="mt-16 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Compare Monuments</h2>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
              Explore the differences and similarities between India's magnificent monuments. Compare architectural
              styles, historical periods, and cultural significance side by side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Side-by-Side Analysis</h3>
              <p className="text-gray-300 text-sm">Compare architectural features, history, and visiting information</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <ArrowLeftRight className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Interactive Comparison</h3>
              <p className="text-gray-300 text-sm">Swap monuments easily and get instant insights</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                <Info className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Insights</h3>
              <p className="text-gray-300 text-sm">Discover connections and differences automatically</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3"
              asChild
            >
              <Link href="/compare">
                <ArrowLeftRight className="mr-2 h-5 w-5" />
                Start Comparing Monuments
              </Link>
            </Button>
          </div>
        </section>

        <Features />
      </div>

      <ContactSection />
    </main>
  )
}
