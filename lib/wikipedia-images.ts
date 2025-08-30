interface WikipediaImage {
  title: string
  url: string
  descriptionurl: string
  width: number
  height: number
}

interface WikipediaImageInfo {
  id: string
  url: string
  thumbnail: string
  description: string
  photographer: string
  source: string
  originalUrl: string
  downloadUrl: string
}

// Monument name mappings for Wikipedia Commons search
const monumentWikipediaNames: Record<string, string[]> = {
  "Gol Gumbaz": ["Gol Gumbaz", "Gol Gumbad Bijapur", "Ibrahim Rauza"],
  "Taj Mahal": ["Taj Mahal", "Taj Mahal Agra", "Mumtaz Mahal tomb"],
  "Red Fort": ["Red Fort Delhi", "Lal Qila", "Red Fort India"],
  "Qutub Minar": ["Qutub Minar", "Qutb Minar Delhi", "Qutub Complex"],
  "Mysore Palace": ["Mysore Palace", "Mysuru Palace", "Amba Vilas Palace"],
  "Virupaksha Temple Hampi": ["Virupaksha Temple", "Hampi Virupaksha", "Virupaksha Hampi"],
  "Stone Chariot Hampi": ["Stone Chariot Hampi", "Vittala Temple Chariot", "Hampi Stone Chariot"],
  "Chitradurga Fort": ["Chitradurga Fort", "Chitradurga Karnataka", "Chitrakaldurga"],
  "Aihole Temples": ["Aihole", "Aihole temples", "Chalukya temples Aihole"],
  "Belur Chennakeshava Temple": ["Chennakeshava Temple Belur", "Belur temple", "Hoysala Belur"],
  "Halebidu Hoysaleswara Temple": ["Hoysaleswara Temple", "Halebidu temple", "Halebid Hoysala"],
  "Badami Cave Temples": ["Badami caves", "Badami cave temples", "Chalukya caves"],
  "Pattadakal Group": ["Pattadakal", "Pattadakal temples", "Chalukya Pattadakal"],
  "Shravanabelagola": ["Shravanabelagola", "Bahubali statue", "Gommateshwara"],
  "Bangalore Fort": ["Bangalore Fort", "Bengaluru Fort", "Tipu Sultan Fort Bangalore"],
  "Tipu Sultan's Summer Palace": ["Tipu Sultan Summer Palace", "Daria Daulat Bagh", "Tipu Palace Srirangapatna"],
  "Melukote Temple": ["Melukote", "Cheluvanarayana Swamy Temple", "Melkote temple"],
  "Murudeshwar Temple": ["Murudeshwar", "Murudeshwar temple", "Shiva statue Murudeshwar"],
  "Golden Temple": ["Golden Temple Amritsar", "Harmandir Sahib", "Darbar Sahib"],
  "Gateway of India": ["Gateway of India Mumbai", "Gateway of India Bombay"],
  "Hawa Mahal": ["Hawa Mahal Jaipur", "Palace of Winds", "Hawa Mahal Rajasthan"],
  "Charminar": ["Charminar Hyderabad", "Charminar Telangana"],
  "Victoria Memorial": ["Victoria Memorial Kolkata", "Victoria Memorial Calcutta"],
  "India Gate": ["India Gate Delhi", "All India War Memorial"],
  "Meenakshi Temple": ["Meenakshi Temple Madurai", "Meenakshi Amman Temple"],
  "Brihadeeswara Temple": ["Brihadeeswara Temple", "Thanjavur temple", "Big Temple Thanjavur"],
  "Lotus Temple": ["Lotus Temple Delhi", "Bahai Temple Delhi"],
  "Akshardham Temple": ["Akshardham Delhi", "Swaminarayan Akshardham"],
  "Fatehpur Sikri": ["Fatehpur Sikri", "Buland Darwaza", "Akbar Fatehpur Sikri"],
  "Amber Fort": ["Amber Fort Jaipur", "Amer Fort", "Amber Palace"],
  "Humayun's Tomb": ["Humayun Tomb Delhi", "Humayun mausoleum"],
  "Ajanta Caves": ["Ajanta Caves", "Ajanta cave paintings"],
  "Ellora Caves": ["Ellora Caves", "Kailasa temple Ellora"],
  "Khajuraho Temples": ["Khajuraho", "Khajuraho temples", "Chandela temples"],
  "Konark Sun Temple": ["Konark Sun Temple", "Sun Temple Odisha", "Konark temple"],
  "Sanchi Stupa": ["Sanchi Stupa", "Great Stupa Sanchi", "Buddhist Sanchi"],
}

export async function searchWikipediaImages(monumentName: string): Promise<WikipediaImageInfo[]> {
  try {
    console.log(`🔍 Searching Wikipedia Commons for: ${monumentName}`)

    const searchTerms = monumentWikipediaNames[monumentName] || [monumentName]
    const allImages: WikipediaImageInfo[] = []

    for (const searchTerm of searchTerms) {
      try {
        // Search for images using Wikipedia Commons API
        const searchUrl =
          `https://commons.wikimedia.org/w/api.php?` +
          `action=query&` +
          `format=json&` +
          `generator=search&` +
          `gsrnamespace=6&` +
          `gsrsearch=${encodeURIComponent(searchTerm)}&` +
          `gsrlimit=10&` +
          `prop=imageinfo&` +
          `iiprop=url|size|extmetadata&` +
          `iiurlwidth=800&` +
          `iiurlheight=600&` +
          `origin=*`

        console.log(`📡 Fetching from Wikipedia Commons: ${searchTerm}`)

        const response = await fetch(searchUrl)

        if (!response.ok) {
          console.warn(`⚠️ Wikipedia API request failed for "${searchTerm}": ${response.status}`)
          continue
        }

        const data = await response.json()

        if (data.query && data.query.pages) {
          const pages = Object.values(data.query.pages) as any[]

          for (const page of pages) {
            if (page.imageinfo && page.imageinfo[0]) {
              const imageInfo = page.imageinfo[0]

              // Filter out non-photo files (SVG, diagrams, etc.)
              if (
                imageInfo.url &&
                (imageInfo.url.includes(".jpg") || imageInfo.url.includes(".jpeg") || imageInfo.url.includes(".png")) &&
                imageInfo.width > 400 &&
                imageInfo.height > 300
              ) {
                const artist = imageInfo.extmetadata?.Artist?.value || "Wikipedia Commons"
                const description = imageInfo.extmetadata?.ImageDescription?.value || page.title

                allImages.push({
                  id: `wiki-${page.pageid}`,
                  url: imageInfo.thumburl || imageInfo.url,
                  thumbnail: imageInfo.thumburl?.replace("800px", "300px") || imageInfo.url,
                  description: cleanDescription(description, monumentName),
                  photographer: cleanArtist(artist),
                  source: "Wikipedia Commons",
                  originalUrl: imageInfo.descriptionurl || imageInfo.url,
                  downloadUrl: imageInfo.url,
                })
              }
            }
          }
        }

        // Limit to 10 images total
        if (allImages.length >= 10) break
      } catch (searchError) {
        console.warn(`⚠️ Error searching for "${searchTerm}":`, searchError)
        continue
      }
    }

    console.log(`✅ Found ${allImages.length} Wikipedia Commons images for ${monumentName}`)
    return allImages.slice(0, 10) // Return max 10 images
  } catch (error) {
    console.error(`❌ Error in Wikipedia Commons search for ${monumentName}:`, error)
    return []
  }
}

function cleanDescription(description: string, monumentName: string): string {
  if (!description) return `${monumentName} - Historical view`

  // Remove HTML tags
  const cleaned = description.replace(/<[^>]*>/g, "").trim()

  // If description is too long or generic, create a better one
  if (cleaned.length > 100 || cleaned.toLowerCase().includes("file:")) {
    return `${monumentName} - Historical photograph`
  }

  return cleaned || `${monumentName} - Heritage site`
}

function cleanArtist(artist: string): string {
  if (!artist) return "Wikipedia Commons"

  // Remove HTML tags and clean up
  const cleaned = artist.replace(/<[^>]*>/g, "").trim()

  // If it's too long or contains file info, simplify
  if (cleaned.length > 50 || cleaned.toLowerCase().includes("file:")) {
    return "Wikipedia Commons"
  }

  return cleaned || "Wikipedia Commons"
}

// Fallback images for monuments without Wikipedia Commons images
export function generateFallbackImages(monumentName: string): WikipediaImageInfo[] {
  const imageTypes = [
    "main view",
    "architectural details",
    "historical perspective",
    "heritage documentation",
    "cultural significance",
    "tourism view",
  ]

  return imageTypes.map((type, index) => {
    const seed = `${monumentName.toLowerCase().replace(/\s+/g, "-")}-${type.replace(/\s+/g, "-")}`
    const imageId = Math.abs(seed.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) + index * 100

    return {
      id: `fallback-${monumentName.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
      url: `https://picsum.photos/seed/${imageId}/800/600`,
      thumbnail: `https://picsum.photos/seed/${imageId}/300/200`,
      description: `${monumentName} - ${type}`,
      photographer: "Heritage Documentation",
      source: "Placeholder",
      originalUrl: `https://picsum.photos/seed/${imageId}/1200/900`,
      downloadUrl: `https://picsum.photos/seed/${imageId}/1600/1200`,
    }
  })
}
