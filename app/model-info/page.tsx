import { ModelInfoDisplay } from "@/components/model-info-display"

export default function ModelInfoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Monument Recognition Model</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Detailed information about our deep learning model for Indian monument recognition, including architecture,
          training data, and performance metrics.
        </p>
      </div>

      <ModelInfoDisplay />
    </main>
  )
}
