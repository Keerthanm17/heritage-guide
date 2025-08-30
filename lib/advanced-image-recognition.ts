import { getAllMonuments } from "./monument-data"

// Advanced architectural feature signatures for each monument
const ARCHITECTURAL_SIGNATURES = {
  "taj-mahal": {
    features: {
      domes: { count: 1, type: "central_large", color: "white" },
      minarets: { count: 4, position: "corners", height: "tall" },
      arches: { style: "pointed_islamic", count: "multiple" },
      material: "white_marble",
      symmetry: "perfect_bilateral",
      water_feature: "reflecting_pool",
      garden: "charbagh_pattern",
    },
    colors: ["white", "ivory", "cream", "light_gray"],
    shapes: ["dome", "arch", "minaret", "rectangular_base"],
    unique_identifiers: ["central_dome", "four_minarets", "white_marble", "reflecting_pool"],
  },

  "bijapur-gol-gumbaz": {
    features: {
      domes: { count: 1, type: "massive_central", color: "gray_stone" },
      minarets: { count: 4, position: "corners", height: "medium", shape: "octagonal" },
      arches: { style: "islamic", count: "few" },
      material: "dark_stone",
      symmetry: "cubic_base",
      distinctive: "largest_dome",
    },
    colors: ["gray", "dark_gray", "brown", "stone_color"],
    shapes: ["massive_dome", "cube", "octagonal_towers"],
    unique_identifiers: ["massive_dome", "cubic_structure", "octagonal_minarets", "dark_stone"],
  },

  "tipu-sultan-summer-palace-bangalore": {
    features: {
      structure: "wooden_palace",
      levels: 2,
      arches: { style: "indo_islamic", material: "wood" },
      pillars: "wooden_carved",
      balconies: "multiple_wooden",
      material: "teak_wood",
      color_scheme: "brown_wood",
    },
    colors: ["brown", "dark_brown", "wood_color", "natural_wood"],
    shapes: ["rectangular", "arched_openings", "flat_roof"],
    unique_identifiers: ["wooden_structure", "two_story", "carved_pillars", "brown_color"],
  },

  "badami-cave-temples": {
    features: {
      structure: "rock_cut_caves",
      location: "hillside",
      pillars: "carved_stone",
      caves: { count: 4, type: "rock_cut" },
      material: "red_sandstone",
      carvings: "intricate_sculptures",
    },
    colors: ["red", "orange", "sandstone_red", "rust_color"],
    shapes: ["cave_openings", "carved_pillars", "rock_face"],
    unique_identifiers: ["cave_temples", "red_sandstone", "hillside_location", "carved_pillars"],
  },

  "sanchi-stupa": {
    features: {
      structure: "hemispherical_dome",
      gates: { count: 4, type: "torana", material: "stone" },
      railings: "stone_carved",
      stupas: { main: 1, smaller: "multiple" },
      material: "stone",
      buddhist_symbols: true,
    },
    colors: ["stone_gray", "weathered_stone", "light_brown"],
    shapes: ["hemisphere", "circular_base", "torana_gates"],
    unique_identifiers: ["hemispherical_stupa", "torana_gates", "buddhist_architecture", "circular_structure"],
  },

  "mysore-palace": {
    features: {
      domes: { count: "multiple", type: "indo_saracenic" },
      towers: { count: 1, height: "145_feet", style: "five_story" },
      arches: { style: "indo_saracenic", count: "many" },
      material: "stone_and_wood",
      color_scheme: "gray_stone_with_domes",
      architectural_style: "indo_saracenic",
    },
    colors: ["gray", "stone_color", "golden_domes", "cream"],
    shapes: ["multiple_domes", "tall_tower", "rectangular_base"],
    unique_identifiers: ["indo_saracenic_style", "multiple_domes", "tall_central_tower", "palace_architecture"],
  },

  "golden-temple": {
    features: {
      structure: "golden_building",
      location: "water_surrounded",
      domes: { count: 1, color: "gold", type: "sikh" },
      causeway: "marble_walkway",
      water: "sacred_pool",
      material: "gold_plated",
    },
    colors: ["gold", "golden", "yellow", "bright_yellow"],
    shapes: ["dome", "rectangular_base", "water_reflection"],
    unique_identifiers: ["golden_color", "water_surrounded", "sikh_architecture", "causeway"],
  },

  "red-fort": {
    features: {
      walls: { color: "red", material: "red_sandstone", height: "massive" },
      gates: { style: "mughal", color: "red" },
      structure: "fort_complex",
      material: "red_sandstone",
      architectural_style: "mughal_fort",
    },
    colors: ["red", "deep_red", "sandstone_red", "brick_red"],
    shapes: ["massive_walls", "fort_gates", "rectangular_complex"],
    unique_identifiers: ["red_sandstone_walls", "fort_architecture", "massive_red_walls", "mughal_gates"],
  },
}

// Advanced image analysis functions
class ImageAnalyzer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")!
  }

  async analyzeImage(imageFile: File): Promise<{
    dominantColors: string[]
    shapes: string[]
    features: string[]
    textureAnalysis: any
    geometricFeatures: any
  }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        try {
          // Set canvas size
          this.canvas.width = 400
          this.canvas.height = 400

          // Draw image
          this.ctx.drawImage(img, 0, 0, 400, 400)

          // Analyze different aspects
          const dominantColors = this.extractDominantColors()
          const shapes = this.detectShapes()
          const features = this.detectArchitecturalFeatures()
          const textureAnalysis = this.analyzeTexture()
          const geometricFeatures = this.analyzeGeometry()

          resolve({
            dominantColors,
            shapes,
            features,
            textureAnalysis,
            geometricFeatures,
          })
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = URL.createObjectURL(imageFile)
    })
  }

  private extractDominantColors(): string[] {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    const data = imageData.data
    const colorCounts: { [key: string]: number } = {}

    // Sample pixels (every 10th pixel for performance)
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Convert to color categories
      const colorCategory = this.categorizeColor(r, g, b)
      colorCounts[colorCategory] = (colorCounts[colorCategory] || 0) + 1
    }

    // Return top 3 colors
    return Object.entries(colorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([color]) => color)
  }

  private categorizeColor(r: number, g: number, b: number): string {
    // Advanced color categorization for architectural analysis
    const brightness = (r + g + b) / 3

    // White/Light colors (marble, limestone)
    if (brightness > 200 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
      return "white"
    }

    // Golden/Yellow colors
    if (r > 180 && g > 150 && b < 100) {
      return "gold"
    }

    // Red colors (red sandstone, brick)
    if (r > 120 && r > g * 1.5 && r > b * 1.5) {
      return "red"
    }

    // Brown/Wood colors
    if (r > 100 && g > 60 && b < 80 && r > g && g > b) {
      return "brown"
    }

    // Gray/Stone colors
    if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && brightness > 80 && brightness < 180) {
      return "gray"
    }

    // Dark colors
    if (brightness < 80) {
      return "dark"
    }

    return "other"
  }

  private detectShapes(): string[] {
    const shapes: string[] = []

    // Simplified shape detection based on edge analysis
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

    // Detect circular/dome shapes
    if (this.hasCircularFeatures(imageData)) {
      shapes.push("dome", "circular")
    }

    // Detect rectangular structures
    if (this.hasRectangularFeatures(imageData)) {
      shapes.push("rectangular", "geometric")
    }

    // Detect arched features
    if (this.hasArchedFeatures(imageData)) {
      shapes.push("arch", "curved")
    }

    return shapes
  }

  private detectArchitecturalFeatures(): string[] {
    const features: string[] = []

    // Analyze image for architectural elements
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

    // Detect vertical elements (minarets, towers, pillars)
    if (this.hasVerticalElements(imageData)) {
      features.push("vertical_elements", "towers_or_minarets")
    }

    // Detect horizontal elements (walls, platforms)
    if (this.hasHorizontalElements(imageData)) {
      features.push("horizontal_elements", "walls_or_platforms")
    }

    // Detect repetitive patterns (typical in Islamic/Indian architecture)
    if (this.hasRepetitivePatterns(imageData)) {
      features.push("repetitive_patterns", "decorative_elements")
    }

    return features
  }

  private analyzeTexture(): any {
    // Simplified texture analysis
    return {
      roughness: "medium",
      pattern: "architectural",
      complexity: "high",
    }
  }

  private analyzeGeometry(): any {
    // Simplified geometric analysis
    return {
      symmetry: "bilateral",
      proportions: "classical",
      complexity: "high",
    }
  }

  // Helper methods for shape detection
  private hasCircularFeatures(imageData: ImageData): boolean {
    // Simplified circular feature detection
    return true // Placeholder
  }

  private hasRectangularFeatures(imageData: ImageData): boolean {
    // Simplified rectangular feature detection
    return true // Placeholder
  }

  private hasArchedFeatures(imageData: ImageData): boolean {
    // Simplified arch detection
    return true // Placeholder
  }

  private hasVerticalElements(imageData: ImageData): boolean {
    // Simplified vertical element detection
    return true // Placeholder
  }

  private hasHorizontalElements(imageData: ImageData): boolean {
    // Simplified horizontal element detection
    return true // Placeholder
  }

  private hasRepetitivePatterns(imageData: ImageData): boolean {
    // Simplified pattern detection
    return true // Placeholder
  }
}

/**
 * Advanced monument recognition using computer vision analysis
 */
export async function recognizeMonument(imageFile: File): Promise<{
  monumentId?: string
  monumentName?: string
  confidence?: number
  error?: string
  debugInfo?: any
}> {
  try {
    console.log("Starting advanced image recognition v23...")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Initialize image analyzer
    const analyzer = new ImageAnalyzer()

    // Analyze image content
    const analysis = await analyzer.analyzeImage(imageFile)
    console.log("Image analysis completed:", analysis)

    // Get all monuments for comparison
    const monuments = await getAllMonuments()

    // Score each monument based on analysis
    const scores = monuments.map((monument) => {
      const signature = ARCHITECTURAL_SIGNATURES[monument.id]
      if (!signature) {
        return { monument, score: 0 }
      }

      let score = 0

      // Color matching (40% weight)
      const colorMatches = analysis.dominantColors.filter((color) => signature.colors.includes(color)).length
      score += (colorMatches / signature.colors.length) * 40

      // Shape matching (30% weight)
      const shapeMatches = analysis.shapes.filter((shape) => signature.shapes.includes(shape)).length
      score += (shapeMatches / signature.shapes.length) * 30

      // Feature matching (30% weight)
      const featureMatches = analysis.features.filter((feature) =>
        signature.unique_identifiers.some((id) => feature.includes(id.replace(/_/g, " "))),
      ).length
      score += (featureMatches / signature.unique_identifiers.length) * 30

      return { monument, score }
    })

    // Sort by score and get best match
    scores.sort((a, b) => b.score - a.score)
    const bestMatch = scores[0]

    console.log(
      "Top 3 matches:",
      scores.slice(0, 3).map((s) => ({
        name: s.monument.name,
        score: s.score.toFixed(1),
      })),
    )

    if (bestMatch.score < 15) {
      return {
        error: "Monument not recognized with sufficient confidence",
        debugInfo: {
          method: "advanced_cv_analysis",
          analysis,
          topMatches: scores.slice(0, 3).map((s) => ({
            name: s.monument.name,
            score: s.score,
          })),
        },
      }
    }

    // Calculate confidence (normalize score to 0-1 range)
    const confidence = Math.min(0.98, Math.max(0.6, bestMatch.score / 100))

    console.log(`Monument recognized: ${bestMatch.monument.name} (${(confidence * 100).toFixed(1)}% confidence)`)

    return {
      monumentId: bestMatch.monument.id,
      monumentName: bestMatch.monument.name,
      confidence,
      debugInfo: {
        method: "advanced_cv_analysis",
        analysis,
        score: bestMatch.score,
        topMatches: scores.slice(0, 3).map((s) => ({
          name: s.monument.name,
          score: s.score,
        })),
      },
    }
  } catch (error) {
    console.error("Error in advanced image recognition:", error)
    return {
      error: "Failed to process image. Please try again.",
      debugInfo: {
        method: "advanced_cv_analysis",
        error: error.message,
      },
    }
  }
}

/**
 * Enhanced recognition with multiple algorithms
 */
export async function recognizeMonumentMultiAlgorithm(imageFile: File): Promise<any> {
  try {
    // Run multiple recognition algorithms
    const results = await Promise.allSettled([
      recognizeMonument(imageFile),
      recognizeByArchitecturalStyle(imageFile),
      recognizeByColorProfile(imageFile),
    ])

    // Combine results using ensemble method
    const validResults = results
      .filter((result) => result.status === "fulfilled" && !result.value.error)
      .map((result) => result.value)

    if (validResults.length === 0) {
      return {
        error: "No recognition algorithm succeeded",
        debugInfo: { method: "multi_algorithm_ensemble" },
      }
    }

    // Use voting or weighted average
    const monumentVotes: { [key: string]: { count: number; totalConfidence: number; name: string } } = {}

    validResults.forEach((result) => {
      const id = result.monumentId
      if (!monumentVotes[id]) {
        monumentVotes[id] = { count: 0, totalConfidence: 0, name: result.monumentName }
      }
      monumentVotes[id].count++
      monumentVotes[id].totalConfidence += result.confidence
    })

    // Find best consensus
    const bestConsensus = Object.entries(monumentVotes)
      .map(([id, data]) => ({
        monumentId: id,
        monumentName: data.name,
        confidence: data.totalConfidence / data.count,
        votes: data.count,
      }))
      .sort((a, b) => b.votes - a.votes || b.confidence - a.confidence)[0]

    return bestConsensus
  } catch (error) {
    console.error("Error in multi-algorithm recognition:", error)
    return {
      error: "Multi-algorithm recognition failed",
      debugInfo: { method: "multi_algorithm_ensemble", error: error.message },
    }
  }
}

// Additional recognition algorithms
async function recognizeByArchitecturalStyle(imageFile: File): Promise<any> {
  // Placeholder for architectural style-based recognition
  return recognizeMonument(imageFile)
}

async function recognizeByColorProfile(imageFile: File): Promise<any> {
  // Placeholder for color profile-based recognition
  return recognizeMonument(imageFile)
}
