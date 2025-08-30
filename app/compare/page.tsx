import { MonumentComparison } from "@/components/monument-comparison"
import { getMonumentById } from "@/lib/monument-data"

interface ComparePageProps {
  searchParams: { monument?: string }
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  let preselectedMonument = null

  if (searchParams.monument) {
    preselectedMonument = await getMonumentById(searchParams.monument)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/indian-heritage-bg.png')] bg-cover bg-center opacity-10"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compare
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Indian Monuments
              </span>
            </h1>
            <p className="text-gray-200 max-w-3xl mx-auto text-lg">
              Search and explore the architectural marvels of India side by side. Compare historical significance,
              architectural styles, and cultural importance of our magnificent heritage sites.
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <MonumentComparison preselectedMonumentId={searchParams.monument} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "Compare Monuments - Indian Heritage Guide",
  description:
    "Search and compare Indian monuments side by side to understand their differences, similarities, and unique characteristics.",
}
