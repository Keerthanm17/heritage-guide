export interface HistoricalCharacter {
  id: string
  name: string
  title: string
  era: string
  personality: string
  speechPattern: string
  avatar: string
  monuments: string[] // Monument IDs they're associated with
  backstory: string
  keyQuotes: string[]
  relationships: { [key: string]: string }
  connectionToMonument: string // How they're connected to the monument
}

export const historicalCharacters: HistoricalCharacter[] = [
  {
    id: "shah_jahan",
    name: "Shah Jahan",
    title: "Fifth Mughal Emperor",
    era: "1628-1658",
    personality: "Romantic, artistic, melancholic, passionate about architecture",
    speechPattern: "Formal, poetic, emotional, uses metaphors about love and beauty",
    avatar: "👑",
    monuments: ["taj-mahal", "red-fort-delhi", "jama-masjid"],
    backstory:
      "The emperor who built the Taj Mahal for his beloved wife Mumtaz Mahal. Known for his architectural patronage and tragic later life.",
    keyQuotes: [
      "The world is but a bridge; pass over it, but build no house upon it",
      "Beauty lies in the eyes of the beholder, but the Taj Mahal makes every beholder beautiful",
      "Love is the bridge between two hearts, and architecture is love made visible",
    ],
    relationships: {
      "Mumtaz Mahal": "My beloved wife, crown of the palace",
      Aurangzeb: "My son who imprisoned me in my final years",
      "Ustad Ahmad Lahauri": "The brilliant architect who brought my vision to life",
    },
    connectionToMonument: "Built the Taj Mahal as a tomb for his wife Mumtaz Mahal",
  },
  {
    id: "qutb_ud_din_aibak",
    name: "Qutb-ud-din Aibak",
    title: "Founder of Delhi Sultanate",
    era: "1206-1210",
    personality: "Military commander, ambitious, builder of monuments, Turkish slave-turned-sultan",
    speechPattern: "Authoritative, speaks of conquest and establishing Islamic rule in India",
    avatar: "🗡️",
    monuments: ["qutub-minar-delhi", "quwwat-ul-islam-mosque"],
    backstory: "The first Sultan of Delhi who founded the Delhi Sultanate and began construction of the Qutub Minar.",
    keyQuotes: [
      "I have established the rule of Islam in Hindustan",
      "These monuments shall stand as testimony to our conquest",
      "From slave to sultan - such is the will of Allah",
    ],
    relationships: {
      "Muhammad Ghori": "My master who made me his trusted general",
      Iltutmish: "My successor who completed my vision",
    },
    connectionToMonument: "Founded the construction of Qutub Minar as a victory tower and symbol of Islamic conquest",
  },
  {
    id: "ibrahim_adil_shah_ii",
    name: "Ibrahim Adil Shah II",
    title: "Sultan of Bijapur",
    era: "1580-1627",
    personality: "Patron of arts, music lover, tolerant ruler, architectural visionary",
    speechPattern: "Artistic, speaks of music and architecture, tolerant and inclusive",
    avatar: "🎭",
    monuments: ["bijapur-gol-gumbaz", "ibrahim-rauza", "bijapur-fort"],
    backstory: "The Sultan of Bijapur who built the magnificent Gol Gumbaz and was known for his patronage of arts.",
    keyQuotes: [
      "Music is the language that speaks to all souls",
      "Let this dome echo with the prayers of all faiths",
      "Architecture should inspire awe and bring people together",
    ],
    relationships: {
      "Taj Bibi Bilqis": "My beloved wife for whom I built Ibrahim Rauza",
      "Malik Ambar": "My rival who challenged our kingdom",
    },
    connectionToMonument: "Built Gol Gumbaz as his mausoleum, featuring the world's second-largest dome",
  },
  {
    id: "madakari_nayaka",
    name: "Madakari Nayaka",
    title: "Last Ruler of Chitradurga",
    era: "1758-1779",
    personality: "Brave defender, loyal to his people, tragic hero who fought till the end",
    speechPattern: "Passionate, speaks of loyalty, sacrifice, and defending one's homeland",
    avatar: "🛡️",
    monuments: ["chitradurga-fort"],
    backstory: "The last ruler of Chitradurga who defended the fort against Hyder Ali's forces until his death.",
    keyQuotes: [
      "I would rather die defending my fort than live in submission",
      "These walls have seen generations of my family's rule",
      "A true warrior never abandons his fortress",
    ],
    relationships: {
      "Onake Obavva": "The brave woman who defended our fort with just a pestle",
      "Hyder Ali": "The invader who ultimately conquered our stronghold",
    },
    connectionToMonument: "Last ruler who defended Chitradurga Fort against Hyder Ali's siege",
  },
  {
    id: "krishnadevaraya",
    name: "Krishnadevaraya",
    title: "Emperor of Vijayanagara",
    era: "1509-1529",
    personality: "Scholarly, patron of arts, just ruler, devotee of Lord Krishna",
    speechPattern: "Scholarly, references literature and dharma, speaks of golden age",
    avatar: "📚",
    monuments: ["hampi-virupaksha-temple", "hampi-vittala-temple", "hazara-rama-temple"],
    backstory:
      "The greatest ruler of the Vijayanagara Empire, patron of arts and literature during the golden age of South India.",
    keyQuotes: [
      "A king should be like a tree that gives shade to all who seek shelter",
      "Literature and art are the true wealth of a kingdom",
      "Dharma is the foundation upon which all kingdoms stand",
    ],
    relationships: {
      "Tenali Rama": "My clever courtier whose wit brightens the court",
      Ashtadiggajas: "The eight great poets of my court",
    },
    connectionToMonument: "Patronized and expanded these temples during the golden age of Vijayanagara",
  },
  {
    id: "tipu_sultan",
    name: "Tipu Sultan",
    title: "Tiger of Mysore",
    era: "1782-1799",
    personality: "Fierce, patriotic, innovative, defiant against British rule",
    speechPattern: "Passionate, uses tiger metaphors, speaks of freedom and resistance",
    avatar: "🐅",
    monuments: ["mysore-palace", "tipu-palace", "srirangapatna-fort"],
    backstory: "The ruler of Mysore who fought against British colonialism and was known for his military innovations.",
    keyQuotes: [
      "Better to live one day as a tiger than a thousand years as a sheep",
      "I would rather live two days like a lion than two hundred years like a jackal",
      "The British are like a disease that must be cured",
    ],
    relationships: {
      "Hyder Ali": "My father who taught me the art of war",
      "British East India Company": "The foreign invaders I fought till my last breath",
    },
    connectionToMonument: "Built and fortified these structures during his rule of Mysore",
  },
  {
    id: "maharaja_ranjit_singh",
    name: "Maharaja Ranjit Singh",
    title: "Lion of Punjab",
    era: "1801-1839",
    personality: "Just, secular, military genius, unifier of Punjab",
    speechPattern: "Proud, speaks of unity and justice, uses Punjabi expressions",
    avatar: "🦁",
    monuments: ["golden-temple-amritsar", "lahore-fort"],
    backstory:
      "The founder of the Sikh Empire who united Punjab and was known for his secular policies and military prowess.",
    keyQuotes: [
      "God intended me to look upon all religions with one eye",
      "I have conquered the Punjab, but the Punjab has conquered my heart",
      "Treat all subjects alike, regardless of their religion",
    ],
    relationships: {
      "Guru Nanak": "The founder of our faith whose teachings guide me",
      "Hari Singh Nalwa": "My greatest general who expanded our empire",
    },
    connectionToMonument: "Patronized and beautified these Sikh monuments during his reign",
  },
  {
    id: "quli_qutb_shah",
    name: "Sultan Quli Qutb Shah",
    title: "Founder of Qutb Shahi Dynasty",
    era: "1518-1543",
    personality: "Persian noble, founder of dynasty, patron of architecture",
    speechPattern: "Regal, speaks of establishing dynasty and Persian culture",
    avatar: "🏰",
    monuments: ["charminar-hyderabad", "golconda-fort"],
    backstory: "The founder of the Qutb Shahi dynasty who established Golconda as a major power center.",
    keyQuotes: [
      "From these foundations shall rise a dynasty that endures",
      "Let our monuments speak of Persian grandeur in the Deccan",
      "A fortress is only as strong as the dynasty that builds it",
    ],
    relationships: {
      "Ibrahim Quli Qutb Shah": "My son who will expand our architectural legacy",
      "Bahmani Sultans": "My former masters whom I succeeded",
    },
    connectionToMonument: "Founded the Qutb Shahi dynasty and built the foundations of Golconda Fort",
  },
]

// Enhanced function to get character for monument with comprehensive matching
export function getCharacterForMonument(monumentId: string): HistoricalCharacter | null {
  console.log(`🔍 Looking for character for monument: ${monumentId}`)

  // Direct monument ID match
  const directMatch = historicalCharacters.find((char) => char.monuments.includes(monumentId))

  if (directMatch) {
    console.log(`✅ Direct match found: ${directMatch.name}`)
    return directMatch
  }

  // Comprehensive fuzzy matching for monument names
  const monumentName = monumentId.toLowerCase()

  // Taj Mahal variations
  if (monumentName.includes("taj")) {
    const char = historicalCharacters.find((char) => char.id === "shah_jahan")
    console.log(`✅ Taj match found: ${char?.name}`)
    return char || null
  }

  // Qutub Minar and related
  if (monumentName.includes("qutub") || monumentName.includes("qutb")) {
    const char = historicalCharacters.find((char) => char.id === "qutb_ud_din_aibak")
    console.log(`✅ Qutub match found: ${char?.name}`)
    return char || null
  }

  // Gol Gumbaz
  if (monumentName.includes("gol-gumbaz") || monumentName.includes("bijapur")) {
    const char = historicalCharacters.find((char) => char.id === "ibrahim_adil_shah_ii")
    console.log(`✅ Gol Gumbaz match found: ${char?.name}`)
    return char || null
  }

  // Chitradurga Fort
  if (monumentName.includes("chitradurga")) {
    const char = historicalCharacters.find((char) => char.id === "madakari_nayaka")
    console.log(`✅ Chitradurga match found: ${char?.name}`)
    return char || null
  }

  // Hampi related
  if (monumentName.includes("hampi") || monumentName.includes("virupaksha") || monumentName.includes("vittala")) {
    const char = historicalCharacters.find((char) => char.id === "krishnadevaraya")
    console.log(`✅ Hampi match found: ${char?.name}`)
    return char || null
  }

  // Mysore related
  if (monumentName.includes("mysore") || monumentName.includes("tipu")) {
    const char = historicalCharacters.find((char) => char.id === "tipu_sultan")
    console.log(`✅ Mysore match found: ${char?.name}`)
    return char || null
  }

  // Golden Temple
  if (monumentName.includes("golden-temple") || monumentName.includes("amritsar")) {
    const char = historicalCharacters.find((char) => char.id === "maharaja_ranjit_singh")
    console.log(`✅ Golden Temple match found: ${char?.name}`)
    return char || null
  }

  // Charminar
  if (monumentName.includes("charminar") || monumentName.includes("hyderabad")) {
    const char = historicalCharacters.find((char) => char.id === "quli_qutb_shah")
    console.log(`✅ Charminar match found: ${char?.name}`)
    return char || null
  }

  console.log(`❌ No character found for monument: ${monumentId}`)
  return null
}

export function generateHistoricalResponse(
  character: HistoricalCharacter,
  message: string,
  monument: any,
  context: any,
): string {
  const lowerMessage = message.toLowerCase().trim()

  // Greetings
  const isGreeting =
    lowerMessage === "hi" ||
    lowerMessage === "hello" ||
    lowerMessage === "hey" ||
    lowerMessage === "greetings" ||
    lowerMessage === "namaste" ||
    lowerMessage.startsWith("hi ") ||
    lowerMessage.startsWith("hello ")

  if (isGreeting) {
    const greetings = [
      `Greetings, noble visitor! I am ${character.name}, ${character.title}. You stand before ${monument.name}, which holds special meaning to me. What would you like to know?`,
      `Peace be upon you, traveler. I am ${character.name}. In my era (${character.era}), this place was significant to me. How may I share its stories?`,
      `Welcome, friend. I am ${character.name}. You are in the presence of my legacy. What would you know of my times?`,
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // Building/Construction questions
  if (
    lowerMessage.includes("why") &&
    (lowerMessage.includes("built") || lowerMessage.includes("build") || lowerMessage.includes("create"))
  ) {
    // Character-specific building responses
    if (character.id === "shah_jahan") {
      return `*voice heavy with emotion* I built this monument because when my beloved Mumtaz, the crown of my palace, died during childbirth, my world lost all meaning. I promised her on her deathbed that I would create something so beautiful that the world would weep at its sight. Every marble inlay, every precious stone represents my eternal love for her. It took 22 years and 20,000 craftsmen to build this poem in marble.`
    }

    if (character.id === "qutb_ud_din_aibak") {
      return `*speaks with commanding authority* I built this tower as a symbol of our victory and the establishment of Islamic rule in Hindustan! Every brick of this Qutub Minar proclaims the triumph of Islam. This minaret calls the faithful to prayer and reminds all who see it of our conquest. It stands 73 meters tall - a testament to the might of the Delhi Sultanate that I founded!`
    }

    if (character.id === "ibrahim_adil_shah_ii") {
      return `*speaks with artistic pride* I built this magnificent dome because I wanted to create something that would echo through eternity. This Gol Gumbaz, with the world's second-largest dome, represents the grandeur of our Deccan sultanate. The whispering gallery you experience is my gift - where even the softest prayer can be heard across the vast space. Architecture and music are both divine arts.`
    }

    if (character.id === "madakari_nayaka") {
      return `*voice filled with determination* This fort was not just built by me, but strengthened by generations of my family. Every stone was placed to protect our people, our culture, our independence. These seven concentric walls were designed to withstand any siege. When Hyder Ali's armies came, these walls held firm... until treachery opened our gates. I built and died for the freedom of my people.`
    }

    if (character.id === "krishnadevaraya") {
      return `*speaks with scholarly pride* I patronized these temples because they represent the golden age of our empire! A kingdom's true wealth lies not in gold, but in culture, art, and devotion to dharma. Every pillar, every sculpture tells the story of our civilization's peak. These monuments honor the gods and showcase the artistic brilliance of the Vijayanagara Empire.`
    }

    if (character.id === "tipu_sultan") {
      return `*passionate and fierce* I built and fortified these structures because I could see the British threat growing stronger each day. Every fort, every palace was part of our resistance against foreign domination. My innovations in military technology and architecture were our shield against the East India Company. Better to die as a tiger defending our land than live as sheep under foreign rule!`
    }

    if (character.id === "maharaja_ranjit_singh") {
      return `*speaks with pride and devotion* I beautified this sacred temple because it represents the heart of our Sikh faith. The gold you see covering the temple was my offering to honor Guru Nanak's teachings. This place should shine like the divine light it represents, welcoming all people regardless of their faith. My empire was built on the principles of equality and justice.`
    }

    if (character.id === "quli_qutb_shah") {
      return `*regal and visionary* I built this Charminar as the centerpiece of my new city. Each of its four minarets represents the four pillars of our dynasty - justice, prosperity, culture, and faith. This monument marks the heart of Hyderabad, which I founded to be a jewel of the Deccan. From these foundations rose a dynasty that would endure for centuries.`
    }

    // Generic response
    return `*speaks with authority* I built this because ${character.connectionToMonument.toLowerCase()}. In my time, architecture was about power, faith, and leaving a legacy. This monument represents my vision and values.`
  }

  // Personal questions
  if (lowerMessage.includes("who are you") || lowerMessage.includes("about you")) {
    return `I am ${character.name}, ${character.title}, who ruled during ${character.era}. ${character.backstory} My connection to this monument: ${character.connectionToMonument}. What aspect of my life interests you?`
  }

  // Architecture questions
  if (lowerMessage.includes("architecture") || lowerMessage.includes("design") || lowerMessage.includes("style")) {
    if (character.id === "qutb_ud_din_aibak") {
      return `*proudly gestures* This tower combines Indo-Islamic architecture - we used red sandstone and marble. The intricate calligraphy contains verses from the Quran. We employed local craftsmen but introduced Islamic geometric patterns. The tower has five distinct stories, each representing our cultural synthesis.`
    }

    if (character.id === "ibrahim_adil_shah_ii") {
      return `*artistic enthusiasm* The architecture of Gol Gumbaz represents the pinnacle of Deccan style. The dome is built without any supporting pillars - a marvel of engineering! The acoustic properties create the famous whispering gallery. We blended Persian, Turkish, and local Indian styles to create something unique.`
    }

    return `The architectural style reflects my era (${character.era}). ${character.connectionToMonument}. We employed the finest craftsmen and materials, blending different cultural influences. The design represents not just beauty, but the political and religious significance of my reign.`
  }

  // Wisdom/advice questions
  if (lowerMessage.includes("advice") || lowerMessage.includes("wisdom") || lowerMessage.includes("lesson")) {
    const quote = character.keyQuotes[Math.floor(Math.random() * character.keyQuotes.length)]
    return `*reflects thoughtfully* In my years of rule, I learned much about life, power, and legacy. As I once said: "${quote}". The monuments we build are reflections of our inner selves - our dreams, fears, and aspirations.`
  }

  // Default response
  return `*speaks thoughtfully* You ask about ${monument.name}. ${character.connectionToMonument}. During my reign (${character.era}), this place represented more than architecture - it embodied the spirit of our times. What specific aspect interests you most?`
}
