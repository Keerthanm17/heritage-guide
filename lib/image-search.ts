interface ImageSource {
  name: string
  searchUrl: (query: string, size?: string) => string
  attribution: string
}

export const imageSources: ImageSource[] = [
  {
    name: "Wikimedia Commons",
    searchUrl: (query: string, size = "800x600") => {
      // Wikimedia Commons API for monument images
      const cleanQuery = query.replace(/[^a-zA-Z0-9\s]/g, "").trim()
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cleanQuery)}.jpg?width=${size.split("x")[0]}`
    },
    attribution: "Wikimedia Commons",
  },
  {
    name: "Unsplash Source",
    searchUrl: (query: string, size = "800x600") => {
      return `https://source.unsplash.com/${size}/?${encodeURIComponent(query)}&architecture,monument,heritage`
    },
    attribution: "Unsplash",
  },
  {
    name: "Lorem Picsum",
    searchUrl: (query: string, size = "800x600") => {
      const [width, height] = size.split("x")
      const seed = query.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
      return `https://picsum.photos/seed/${seed}/${width}/${height}`
    },
    attribution: "Lorem Picsum",
  },
]

export function getMonumentImageUrl(monumentName: string, imageType = "main", size = "800x600"): string {
  const searchQuery = `${monumentName} ${imageType} monument heritage architecture`

  // Try Unsplash Source first for better monument-related images
  return imageSources[1].searchUrl(searchQuery, size)
}

export function getMultipleMonumentImages(
  monumentName: string,
  count = 6,
): Array<{
  url: string
  thumbnail: string
  description: string
  source: string
}> {
  const imageTypes = [
    "main view",
    "architecture details",
    "interior",
    "historical perspective",
    "tourism view",
    "heritage site",
  ]

  return imageTypes.slice(0, count).map((type, index) => ({
    url: getMonumentImageUrl(monumentName, type, "800x600"),
    thumbnail: getMonumentImageUrl(monumentName, type, "300x200"),
    description: `${monumentName} - ${type}`,
    source: "Unsplash",
  }))
}
