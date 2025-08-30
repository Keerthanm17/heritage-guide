// Monument-specific search terms for better image results
export const monumentSearchTerms: Record<string, string[]> = {
  "Gol Gumbaz": [
    "Gol Gumbaz Bijapur",
    "Gol Gumbaz dome",
    "Gol Gumbaz interior whispering gallery",
    "Gol Gumbaz Karnataka",
    "Bijapur Gol Gumbaz architecture",
    "Gol Gumbaz mausoleum",
  ],
  "Taj Mahal": [
    "Taj Mahal Agra",
    "Taj Mahal sunrise",
    "Taj Mahal reflection",
    "Taj Mahal marble inlay",
    "Taj Mahal minarets",
    "Taj Mahal gardens",
  ],
  "Red Fort": [
    "Red Fort Delhi",
    "Lal Qila Delhi",
    "Red Fort Lahori Gate",
    "Red Fort walls",
    "Red Fort Mughal architecture",
    "Red Fort ramparts",
  ],
  "Qutub Minar": [
    "Qutub Minar Delhi",
    "Qutb Minar tower",
    "Qutub Minar complex",
    "Qutub Minar Islamic architecture",
    "Qutub Minar UNESCO",
    "Qutub Minar ruins",
  ],
  "Mysore Palace": [
    "Mysore Palace Karnataka",
    "Mysore Palace illumination",
    "Mysore Palace Dasara",
    "Mysore Palace architecture",
    "Mysore Palace interior",
    "Mysore Palace Wadiyar",
  ],
  "Virupaksha Temple Hampi": [
    "Virupaksha Temple Hampi",
    "Hampi Virupaksha gopuram",
    "Virupaksha Temple Karnataka",
    "Hampi temple architecture",
    "Virupaksha Temple Vijayanagara",
    "Hampi UNESCO heritage",
  ],
  "Stone Chariot Hampi": [
    "Stone Chariot Hampi",
    "Hampi Stone Chariot",
    "Vittala Temple Stone Chariot",
    "Hampi Vijayanagara Stone Chariot",
    "Stone Chariot Karnataka",
    "Hampi architectural marvel",
  ],
  "Chitradurga Fort": [
    "Chitradurga Fort Karnataka",
    "Chitradurga hill fort",
    "Chitradurga fort walls",
    "Karnataka hill fortress",
    "Chitradurga fort architecture",
    "Chitradurga fort history",
  ],
}

export function getMonumentSearchTerms(monumentName: string): string[] {
  return (
    monumentSearchTerms[monumentName] || [
      `${monumentName} monument`,
      `${monumentName} architecture`,
      `${monumentName} heritage`,
      `${monumentName} tourism`,
      `${monumentName} historical`,
      `${monumentName} India`,
    ]
  )
}
