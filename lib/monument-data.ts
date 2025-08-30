import type { Monument } from "./types"

// Database of Indian monuments with enhanced details - limited to the specified list
const monuments: Monument[] = [
  // UNESCO World Heritage Sites (10)
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. Built between 1632 and 1653 by Emperor Shah Jahan in memory of his wife Mumtaz Mahal, it is considered the finest example of Mughal architecture, combining elements from Persian, Islamic, and Indian architectural styles. The main mausoleum is flanked by a mosque and a guest house, and the entire complex includes formal gardens, reflecting pools, and a crenellated wall.",
    location: "Agra, Uttar Pradesh",
    yearBuilt: "1632-1653",
    visitingHours: "Sunrise to Sunset (Closed on Fridays)",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Taj+Mahal",
    tags: ["UNESCO World Heritage", "Mausoleum", "Mughal Architecture", "Seven Wonders"],
    history:
      "The Taj Mahal was commissioned by Shah Jahan in 1631, to be built in the memory of his wife Mumtaz Mahal, who died on 17 June that year while giving birth to their 14th child. Construction started in 1632, and the mausoleum was completed in 1648, while the surrounding buildings and garden were finished five years later.",
    architecture:
      "The Taj Mahal is considered the finest example of Mughal architecture, a style that combines elements from Islamic, Persian, Ottoman Turkish and Indian architectural styles. The tomb is the central focus of the entire complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.",
    significance:
      "The Taj Mahal is not only a magnificent monument but also a symbol of eternal love. It represents the zenith of Mughal architecture and is often cited as 'the jewel of Muslim art in India'.",
    entryFee: "₹50 (Indians), ₹1,100 (Foreigners)",
    bestTimeToVisit: "October to March. Sunrise and sunset offer the most spectacular views.",
    photography: "Photography is allowed outside the main mausoleum. No photography is permitted inside the main tomb.",
    howToReach:
      "Agra is well-connected by air, rail, and road. The Taj Mahal is about 7 km from Agra Cantt Railway Station and 15 km from Agra Airport.",
    nearbyAttractions: [
      "Agra Fort (2.5 km)",
      "Fatehpur Sikri (40 km)",
      "Mehtab Bagh (Gardens across the Yamuna)",
      "Itimad-ud-Daulah's Tomb (Baby Taj)",
    ],
  },
  {
    id: "red-fort",
    name: "Red Fort",
    description:
      "The Red Fort is a historic fort in Delhi that served as the main residence of the Mughal Emperors. Built in 1639 by Emperor Shah Jahan when he decided to shift his capital from Agra to Delhi, it derives its name from its massive enclosing walls of red sandstone. The fort complex houses a number of museums, and its architectural elements showcase a blend of Timurid, Persian, and Hindu traditions.",
    location: "Delhi",
    yearBuilt: "1639-1648",
    visitingHours: "9:30 AM - 4:30 PM (Closed on Mondays)",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Red+Fort",
    tags: ["UNESCO World Heritage", "Fort", "Mughal Architecture", "National Symbol"],
    history:
      "The Red Fort was built by Emperor Shah Jahan when he decided to shift his capital from Agra to Delhi in 1639. The fort served as the residence of the Mughal emperors for nearly 200 years, until 1857. After India gained independence in 1947, the fort became a powerful symbol of the nation, and the Prime Minister of India hoists the national flag here on Independence Day (August 15).",
    architecture:
      "The fort's massive red sandstone walls, which stand 75 feet (23 meters) high, enclose a complex of palaces and entertainment halls, projecting balconies, baths and indoor canals, and geometrical gardens, as well as an ornate mosque. Notable structures within the fort include the Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Rang Mahal (Palace of Colors), and Moti Masjid (Pearl Mosque).",
    significance:
      "The Red Fort is not just an architectural marvel but also a symbol of India's struggle for freedom. It was from the ramparts of this fort that India's first Prime Minister, Jawaharlal Nehru, raised the Indian national flag on August 15, 1947, after India gained independence from British rule.",
    entryFee: "₹35 (Indians), ₹500 (Foreigners)",
    bestTimeToVisit:
      "October to March when the weather is pleasant. Avoid visiting on national holidays due to crowds.",
    photography: "Photography is allowed in most areas except inside the museums.",
    howToReach:
      "The Red Fort is well-connected by Delhi Metro (Chandni Chowk station on the Yellow Line is the closest, about 1 km away). Buses, auto-rickshaws, and taxis are also available from all parts of Delhi.",
    nearbyAttractions: [
      "Jama Masjid (1 km)",
      "Chandni Chowk Market (1 km)",
      "Raj Ghat (5 km)",
      "Humayun's Tomb (10 km)",
    ],
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    description:
      "The Qutub Minar is a minaret and 'victory tower' that forms part of the Qutub complex in Delhi. At 72.5 meters, it is the tallest minaret in the world built of bricks. Construction began in 1193 under Qutb-ud-din Aibak and was completed by his successor Iltutmish. The tower tapers from a 14.3-meter base diameter to 2.7 meters at the top and contains a spiral staircase of 379 steps.",
    location: "Delhi",
    yearBuilt: "1192-1220",
    visitingHours: "7:00 AM - 5:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Qutub+Minar",
    tags: ["UNESCO World Heritage", "Minaret", "Indo-Islamic Architecture"],
    history:
      "The Qutub Minar was built over the course of several years, starting from 1192 by Qutb-ud-din Aibak, founder of the Delhi Sultanate. It was later completed by his successor and son-in-law, Iltutmish. The construction of the tower was meant to celebrate Muslim dominance in Delhi after the defeat of Delhi's last Hindu kingdom.",
    architecture:
      "The tower has five distinct storeys, each marked by a projecting balcony and tapers from a 15 m diameter at the base to just 2.5 m at the top. The first three storeys are made of red sandstone; the fourth and fifth storeys are of marble and sandstone. The tower is covered with intricate carvings and verses from the Quran.",
    significance:
      "The Qutub Minar is not just an architectural marvel but also a significant historical monument that marks the beginning of Muslim rule in India. It represents the might of the Delhi Sultanate and the introduction of Islamic architecture to the Indian subcontinent.",
    entryFee: "₹35 (Indians), ₹550 (Foreigners)",
    bestTimeToVisit: "October to March. Early morning visits are recommended to avoid crowds.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "The Qutub Minar is located in Mehrauli in South Delhi. The nearest metro station is Qutub Minar station on the Yellow Line.",
    nearbyAttractions: [
      "Mehrauli Archaeological Park",
      "Garden of Five Senses",
      "Jamali Kamali Mosque and Tomb",
      "Hauz Khas Complex",
    ],
  },
  // Add the missing UNESCO sites:
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    description:
      "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state in India.",
    location: "Aurangabad, Maharashtra",
    yearBuilt: "2nd century BCE - 6th century CE",
    visitingHours: "9:00 AM - 5:30 PM (Closed on Mondays)",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Ajanta+Caves",
    tags: ["UNESCO World Heritage", "Buddhist Caves", "Rock-cut Architecture"],
    history:
      "The Ajanta Caves were built in two phases. The first phase (2nd century BCE) was sponsored by the Satavahana dynasty, and the second phase (5th-6th century CE) was sponsored by the Vakataka dynasty under Emperor Harisena. The caves were abandoned around 480 CE and remained hidden in the forest until 1819 when they were rediscovered by a British officer, John Smith, during a hunting expedition.",
    architecture:
      "The caves are carved into the side of a cliff that is in the shape of a horseshoe. They include both chaitya halls (prayer halls) and viharas (monasteries). The caves feature elaborate facades, intricately carved pillars, and beautiful frescoes that depict scenes from the Jataka tales and the life of Buddha. The architectural style represents the evolution of Buddhist art and architecture over several centuries.",
    significance:
      "The Ajanta Caves are a masterpiece of Buddhist religious art and represent the pinnacle of ancient Indian rock-cut architecture. The paintings and sculptures are considered among the finest surviving examples of ancient Indian art. They provide valuable insights into the social, cultural, and religious life of ancient India.",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    bestTimeToVisit: "November to March when the weather is pleasant. Avoid monsoon season (June-September).",
    photography: "Photography is allowed but flash photography is prohibited to protect the ancient paintings.",
    howToReach:
      "Ajanta is located about 100 km from Aurangabad. The nearest airport is Aurangabad Airport (100 km), and the nearest railway station is Jalgaon Junction (60 km). Regular buses and taxis are available from Aurangabad.",
    nearbyAttractions: [
      "Ellora Caves (100 km)",
      "Daulatabad Fort (15 km from Aurangabad)",
      "Bibi Ka Maqbara (Aurangabad)",
      "Panchakki (Aurangabad)",
    ],
    architecturalFeatures: [
      "Rock-cut cave architecture",
      "Chaitya halls with stupas",
      "Vihara monasteries",
      "Elaborate facades",
      "Intricate pillar carvings",
      "Ancient frescoes",
      "Horseshoe-shaped cliff",
    ],
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    description:
      "Ellora is a UNESCO World Heritage Site located in the Aurangabad district of Maharashtra, India. It is one of the largest rock-cut Hindu temple cave complexes in the world, featuring Buddhist, Hindu and Jain monuments.",
    location: "Aurangabad, Maharashtra",
    yearBuilt: "6th-10th century CE",
    visitingHours: "9:00 AM - 5:30 PM (Closed on Tuesdays)",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Ellora+Caves",
    tags: ["UNESCO World Heritage", "Rock-cut Architecture", "Hindu Temples"],
    history:
      "The Ellora Caves were built between the 6th and 10th centuries CE by various dynasties including the Chalukyas, Rashtrakutas, and Kalachuris. The caves represent the religious harmony that existed in ancient India, with Buddhist, Hindu, and Jain monuments built side by side. The most famous structure, the Kailasa Temple (Cave 16), was built by the Rashtrakuta king Krishna I in the 8th century.",
    architecture:
      "The caves are carved out of the Charanandri hills and include 34 caves - 12 Buddhist (caves 1-12), 17 Hindu (caves 13-29), and 5 Jain (caves 30-34). The Kailasa Temple is the largest monolithic structure in the world, carved from a single rock. The caves feature elaborate sculptures, intricate carvings, and architectural elements that showcase the artistic and engineering skills of ancient Indian craftsmen.",
    significance:
      "Ellora represents the epitome of Indian rock-cut architecture and is a testament to the religious tolerance and artistic excellence of ancient India. The Kailasa Temple is considered one of the most remarkable architectural achievements in human history. The caves provide insights into the religious, cultural, and artistic developments of medieval India.",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    bestTimeToVisit: "November to March. Early morning visits are recommended to avoid crowds.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "Ellora is located about 30 km from Aurangabad. The nearest airport is Aurangabad Airport (30 km), and the nearest railway station is Aurangabad Junction (30 km). Regular buses and taxis are available from Aurangabad.",
    nearbyAttractions: [
      "Ajanta Caves (100 km)",
      "Daulatabad Fort (15 km)",
      "Bibi Ka Maqbara (Aurangabad)",
      "Grishneshwar Temple (1 km)",
    ],
    architecturalFeatures: [
      "Rock-cut cave architecture",
      "Monolithic Kailasa Temple",
      "Multi-story structures",
      "Elaborate sculptures",
      "Intricate carvings",
      "Religious architecture",
      "Engineering marvels",
    ],
  },
  {
    id: "khajuraho-temples",
    name: "Khajuraho Temples",
    description:
      "The Khajuraho Group of Monuments is a group of Hindu and Jain temples in Chhatarpur district, Madhya Pradesh, India. They are a UNESCO World Heritage Site known for their nagara-style architectural symbolism and erotic sculptures.",
    location: "Khajuraho, Madhya Pradesh",
    yearBuilt: "950-1050 CE",
    visitingHours: "8:00 AM - 6:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Khajuraho+Temples",
    tags: ["UNESCO World Heritage", "Hindu Temples", "Erotic Sculptures"],
    history:
      "The Khajuraho temples were built by the Chandela dynasty between 950 and 1050 CE. Originally, there were 85 temples, but only 25 remain today. The temples were built during the golden age of the Chandela dynasty and represent the pinnacle of medieval Indian temple architecture. The temples were abandoned and forgotten until they were rediscovered by British engineer T.S. Burt in 1838.",
    architecture:
      "The temples are built in the Nagara style of temple architecture and are known for their elaborate sculptures and carvings. The temples are divided into three groups - Western, Eastern, and Southern. The Western Group contains the most famous temples including the Kandariya Mahadeva Temple, which is the largest and most ornate. The temples feature intricate carvings depicting various aspects of life, including the famous erotic sculptures.",
    significance:
      "The Khajuraho temples are renowned for their architectural excellence and artistic beauty. The erotic sculptures, which make up only about 10% of the total carvings, represent the celebration of human life and love in all its forms. The temples are a testament to the artistic and cultural achievements of medieval India.",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    bestTimeToVisit: "October to March. The Khajuraho Dance Festival (February) is a special attraction.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "Khajuraho has its own airport with flights from major cities. The nearest railway station is Khajuraho Railway Station (5 km). Regular buses connect Khajuraho to major cities in Madhya Pradesh.",
    nearbyAttractions: [
      "Panna National Park (25 km)",
      "Raneh Falls (20 km)",
      "Beni Sagar Dam (10 km)",
      "Ajaigarh Fort (80 km)",
    ],
    architecturalFeatures: [
      "Nagara style architecture",
      "Elaborate sculptures",
      "Erotic carvings",
      "Sandstone construction",
      "Multi-story temples",
      "Intricate facades",
      "Religious symbolism",
    ],
  },
  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    description:
      "The Konark Sun Temple is a 13th-century CE Hindu Sun temple at Konark about 35 kilometres northeast of Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga dynasty about 1250 CE.",
    location: "Konark, Odisha",
    yearBuilt: "13th century CE",
    visitingHours: "6:00 AM - 8:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Konark+Sun+Temple",
    tags: ["UNESCO World Heritage", "Sun Temple", "Kalinga Architecture"],
    history:
      "The Konark Sun Temple was built by King Narasimhadeva I of the Eastern Ganga dynasty in the 13th century CE. The temple was designed as a colossal chariot of the Sun God, with 12 pairs of wheels and seven horses. According to legend, the temple was built to commemorate the king's victory over Muslim invaders. The temple was partially destroyed in the 17th century, possibly due to natural causes or deliberate destruction.",
    architecture:
      "The temple is designed as a massive chariot of the Sun God, with 12 pairs of elaborately carved wheels and seven horses. The wheels serve as sundials and can be used to calculate time accurately. The temple is built in the Kalinga style of architecture and features intricate carvings depicting various aspects of life, mythology, and astronomy. The temple was constructed using iron beams and stone, showcasing advanced engineering techniques.",
    significance:
      "The Konark Sun Temple is a masterpiece of Odishan architecture and represents the pinnacle of temple building in the Kalinga style. The temple's design as a chariot of the Sun God is unique and demonstrates the advanced understanding of astronomy and engineering in medieval India. The temple is also known for its erotic sculptures and intricate carvings.",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    bestTimeToVisit: "October to March. Sunrise and sunset offer the best views and photography opportunities.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "Konark is located about 35 km from Puri and 65 km from Bhubaneswar. The nearest airport is Bhubaneswar Airport (65 km), and the nearest railway station is Puri Junction (35 km). Regular buses and taxis are available from Puri and Bhubaneswar.",
    nearbyAttractions: [
      "Puri Jagannath Temple (35 km)",
      "Chandrabhaga Beach (3 km)",
      "Ramachandi Temple (10 km)",
      "Bhubaneswar temples (65 km)",
    ],
    architecturalFeatures: [
      "Chariot-shaped design",
      "12 pairs of wheels",
      "Seven horses",
      "Sundial wheels",
      "Iron beam construction",
      "Intricate carvings",
      "Kalinga architecture",
    ],
  },
  {
    id: "sanchi-stupa",
    name: "Sanchi Stupa",
    description:
      "Sanchi Stupa is a Buddhist complex, famous for its Great Stupa, on a hilltop at Sanchi Town in Raisen District of the state of Madhya Pradesh, India. It is located, about 45 kilometres north-east of Bhopal, capital of Madhya Pradesh.",
    location: "Sanchi, Madhya Pradesh",
    yearBuilt: "3rd century BCE",
    visitingHours: "8:00 AM - 6:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Sanchi+Stupa",
    tags: ["UNESCO World Heritage", "Buddhist Stupa", "Ancient Architecture"],
    history:
      "The Great Stupa at Sanchi was commissioned by Emperor Ashoka in the 3rd century BCE to enshrine the relics of Lord Buddha. The stupa was originally a simple hemispherical brick structure. It was later expanded and embellished during the Sunga period (2nd-1st century BCE) and the Satavahana period (1st century BCE-1st century CE). The site remained an important Buddhist center until the 12th century when Buddhism declined in India.",
    architecture:
      "The Great Stupa is a hemispherical dome built of brick and stone, with a height of about 54 feet and a diameter of 120 feet. The stupa is surrounded by a stone railing with four elaborately carved gateways (toranas) at the cardinal directions. The gateways feature intricate carvings depicting scenes from the life of Buddha and Jataka tales. The stupa complex includes several smaller stupas, monasteries, and temples.",
    significance:
      "Sanchi Stupa is one of the oldest and most important Buddhist monuments in India. It represents the beginning of stone architecture in India and showcases the evolution of Buddhist art and architecture over several centuries. The stupa is a symbol of peace and non-violence, reflecting the teachings of Emperor Ashoka and Lord Buddha.",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    bestTimeToVisit: "October to March. Early morning visits offer the best lighting for photography.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "Sanchi is located about 45 km from Bhopal. The nearest airport is Bhopal Airport (45 km), and the nearest railway station is Sanchi Railway Station (1 km). Regular buses and taxis are available from Bhopal.",
    nearbyAttractions: ["Udayagiri Caves (10 km)", "Vidisha (10 km)", "Bhopal (45 km)", "Bhimbetka Caves (90 km)"],
    architecturalFeatures: [
      "Hemispherical dome",
      "Stone railings",
      "Four gateways (toranas)",
      "Intricate carvings",
      "Brick and stone construction",
      "Buddhist symbolism",
      "Ancient engineering",
    ],
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    description:
      "The Mysore Palace, also known as Amba Vilas Palace, is a historical palace and royal residence located in Mysore, Karnataka. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. The palace is now one of the most famous tourist attractions in India, attracting more than 6 million visitors annually. The current palace was built between 1897 and 1912, after the old palace was burnt in a fire.",
    location: "Mysore, Karnataka",
    yearBuilt: "1897-1912",
    visitingHours: "10:00 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Mysore+Palace",
    tags: ["Palace", "Indo-Saracenic Architecture", "Royal Residence"],
    history:
      "The original palace built of wood was burnt down in 1897, during the wedding of Jayalakshammanni, the eldest daughter of Chamaraja Wodeyar, and was rebuilt in 1912 at the cost of Rs. 42 lakhs. The architect was Henry Irwin, and the construction was overseen by B. P. Raghavulu Naidu, an executive engineer in the Mysore Palace division.",
    architecture:
      "The architectural style of the palace is commonly described as Indo-Saracenic, and blends together Hindu, Muslim, Rajput, and Gothic styles. It is a three-storied stone structure, with marble domes and a 145 ft five-storied tower. The palace interior is richly decorated with stained glass, mirrors, carved wooden doors, mosaic floors, and exquisite paintings.",
    significance:
      "The Mysore Palace is one of the most magnificent buildings in India and a splendid remnant of the past. It is a testament to the wealth, power, and artistic sensibility of the Wadiyar dynasty. The palace's grand illumination during the Dasara festival, when it is lit up with nearly 100,000 light bulbs, is a spectacular sight that attracts visitors from all over the world.",
    entryFee: "₹70 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "September to March. The palace is especially magnificent during the Dasara festival (September-October) when it is illuminated with thousands of lights.",
    photography: "Photography is allowed outside the palace. Inside, photography is prohibited.",
    howToReach:
      "Mysore is well-connected by road, rail, and air. The palace is located in the heart of Mysore city. The nearest railway station is Mysore Junction (about 2 km) and the nearest airport is Mysore Airport (about 10 km).",
    nearbyAttractions: [
      "Chamundi Hills (13 km)",
      "Brindavan Gardens (21 km)",
      "Jaganmohan Palace and Art Gallery (1 km)",
      "St. Philomena's Church (3 km)",
    ],
  },
  {
    id: "golden-temple",
    name: "Golden Temple",
    description:
      "The Golden Temple, also known as Sri Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab. It is the preeminent spiritual site of Sikhism. The temple is built around a man-made pool (sarovar) that was completed by the fourth Sikh Guru, Guru Ram Das, in 1577. The temple itself was designed by the fifth Guru, Guru Arjan, and its construction was completed in 1604.",
    location: "Amritsar, Punjab",
    yearBuilt: "1577-1604",
    visitingHours: "Open 24 hours",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Golden+Temple",
    tags: ["Gurdwara", "Sikh Architecture", "Religious Site"],
    history:
      "The Golden Temple was designed by the fifth Guru of Sikhism, Guru Arjan, who had the cornerstone laid by the Muslim Sufi saint Sai Hazrat Mian Mir in 1589. The temple was completed in 1604. The temple was repeatedly rebuilt after it was damaged in the attacks during the 18th century. In the early 19th century, Maharaja Ranjit Singh secured the Punjab region from outside attack and covered the upper floors of the temple with gold, which gives it its distinctive appearance and its English name.",
    architecture:
      "The temple is built at a lower level than the surrounding land so that visitors have to go down steps to enter it, symbolizing humility. The building has a square plan with four entrances, signifying openness to all people and religions. The temple is surrounded by the Amrit Sarovar (Pool of Nectar), and is connected to the land by a causeway. The temple's architecture represents a unique harmony between Islamic and Hindu architectural styles.",
    significance:
      "The Golden Temple is the holiest gurdwara and the most important pilgrimage site of Sikhism. It embodies the core values of Sikhism: equality, brotherhood, and service to humanity. The temple's langar (community kitchen) serves free meals to up to 100,000 people daily, regardless of religion, caste, or background, exemplifying the Sikh principle of service and equality.",
    entryFee: "Free",
    bestTimeToVisit:
      "October to March when the weather is pleasant. The temple is especially beautiful at night when it is illuminated.",
    photography: "Photography is allowed in the outer complex but not inside the sanctum sanctorum.",
    howToReach:
      "Amritsar is well-connected by air, rail, and road. The Golden Temple is located in the heart of Amritsar city, about 13 km from Sri Guru Ram Dass Jee International Airport and 2 km from Amritsar Junction railway station.",
    nearbyAttractions: [
      "Jallianwala Bagh (0.5 km)",
      "Wagah Border (28 km)",
      "Durgiana Temple (1.5 km)",
      "Maharaja Ranjit Singh Museum (3 km)",
    ],
  },
  {
    id: "gateway-of-india",
    name: "Gateway of India",
    description:
      "The Gateway of India is an arch-monument built in the early 20th century in Mumbai. It was erected to commemorate the landing of King-Emperor George V, the first British monarch to visit India, in December 1911. The foundation stone was laid in March 1913, but the actual construction began only in 1915 and was completed in 1924. The Gateway is located on the waterfront at Apollo Bunder area in South Mumbai and overlooks the Arabian Sea.",
    location: "Mumbai, Maharashtra",
    yearBuilt: "1915-1924",
    visitingHours: "Open 24 hours",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Gateway+of+India",
    tags: ["Monument", "Colonial Architecture", "Tourist Attraction"],
    history:
      "The foundation stone was laid in March 1913, and the final design of George Wittet was sanctioned in 1914. The gateway was built from yellow basalt and reinforced concrete. The structural work was completed in 1919, and the architectural work was completed in 1924. Ironically, when the gateway was completed, the British Raj was already facing challenges from the Indian independence movement. In a twist of historical significance, the last British troops to leave India following independence passed through the Gateway in a ceremonial march on February 28, 1948.",
    architecture:
      "The Gateway of India is an arch made of basalt, 26 metres (85 feet) high. The central dome is 48 feet in diameter and 83 feet above the ground at its highest point. The whole harbour front was realigned in order to come in line with a planned esplanade which would sweep down to the centre of the town. The gateway is built in the Indo-Saracenic style, incorporating elements of 16th-century Gujarat architecture. The central dome is inspired by Islamic architecture, while the arches are based on Roman triumphal arches.",
    significance:
      "The Gateway of India is one of Mumbai's most recognized landmarks and a symbol of the city's colonial past. It has witnessed many significant events in India's history, including the departure of the last British troops from India in 1948. Today, it serves as a popular gathering place for locals and tourists alike.",
    entryFee: "Free",
    bestTimeToVisit: "October to March. Evening visits are recommended when the monument is illuminated.",
    photography: "Photography is allowed and is particularly spectacular during sunset.",
    howToReach:
      "The Gateway of India is located in South Mumbai. The nearest railway stations are Churchgate (Western Line) and Chhatrapati Shivaji Terminus (Central Line), both about 2-3 km away. Buses, taxis, and auto-rickshaws are available from all parts of Mumbai.",
    nearbyAttractions: [
      "Taj Mahal Palace Hotel (across the road)",
      "Colaba Causeway (shopping area)",
      "Elephanta Caves (accessible by ferry from the Gateway)",
      "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (formerly Prince of Wales Museum)",
    ],
  },
  {
    id: "virupaksha-temple-hampi",
    name: "Virupaksha Temple Hampi",
    description:
      "The Virupaksha Temple is located in Hampi, Karnataka, and is part of the Group of Monuments at Hampi, designated as a UNESCO World Heritage Site. The temple is dedicated to Lord Virupaksha, a form of Lord Shiva. The temple's history dates back to the 7th century, and it has been in continuous worship ever since, making it one of the oldest functioning Hindu temples in India.",
    location: "Hampi, Karnataka",
    yearBuilt: "7th century, with major expansions in the 14th-16th centuries",
    visitingHours: "6:00 AM - 6:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Virupaksha+Temple+Hampi",
    tags: ["UNESCO World Heritage", "Temple", "Vijayanagara Architecture", "Hindu Temple"],
    history:
      "The Virupaksha Temple has a history dating back to the 7th century. Small shrines in the temple complex date back to the 9th and 10th centuries. However, the main temple structure was built during the Vijayanagara Empire, with major expansions taking place during the reign of King Krishnadevaraya in the early 16th century. The temple survived the destruction of Hampi in 1565 when the Vijayanagara Empire fell, and has remained in continuous worship throughout the centuries.",
    architecture:
      "The temple has a 50-meter high tower (gopuram) at the eastern entrance, which was renovated in the 19th century. The main shrine is dedicated to Virupaksha, a form of Shiva. The temple complex includes shrines for Pampa and Bhuvaneshwari, consorts of Shiva. The temple features intricate stone carvings depicting scenes from Hindu mythology, particularly from the Ramayana and Mahabharata. The complex also includes a large courtyard with pillared halls, smaller shrines, and a tank (pushkarini).",
    significance:
      "The Virupaksha Temple is not only a significant religious site but also a testament to the architectural and artistic achievements of the Vijayanagara Empire. It is one of the few structures in Hampi that survived the destruction of the city in 1565. The temple is known for its unique inverted shadow of the main tower, which can be seen inside the temple. It continues to be an active place of worship and hosts several annual festivals, including the temple chariot festival (ratha) and the marriage celebration of Virupaksha and Pampa.",
    entryFee: "₹10 (Indians), ₹250 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. The annual Virupaksha Car Festival in February is a special attraction.",
    photography: "Photography is allowed in the outer complex but restricted in certain inner sanctums.",
    howToReach:
      "Hampi is located about 340 km from Bangalore. The nearest railway station is Hospet Junction (13 km), and the nearest airport is Hubli Airport (143 km). From Hospet, you can take a bus, auto-rickshaw, or taxi to reach Hampi.",
    nearbyAttractions: [
      "Hampi Bazaar",
      "Vittala Temple and Stone Chariot",
      "Lotus Mahal",
      "Elephant Stables",
      "Hemakuta Hill Temples",
    ],
  },
  {
    id: "stone-chariot-hampi",
    name: "Stone Chariot Hampi",
    description:
      "The Stone Chariot is a famous monument located in the Vittala Temple Complex at Hampi, Karnataka. It is a shrine built in the form of a chariot, dedicated to Garuda, the carrier of Lord Vishnu. The Stone Chariot is one of the most iconic structures in Hampi and is featured on the Indian 50 rupee note. Built during the 16th century by King Krishnadevaraya of the Vijayanagara Empire, it exemplifies the remarkable craftsmanship and architectural brilliance of the period.",
    location: "Vittala Temple Complex, Hampi, Karnataka",
    yearBuilt: "16th century",
    visitingHours: "8:30 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Stone+Chariot+Hampi",
    tags: ["UNESCO World Heritage", "Monument", "Vijayanagara Architecture", "Shrine"],
    history:
      "The Stone Chariot was built during the 16th century under the reign of King Krishnadevaraya, one of the greatest rulers of the Vijayanagara Empire. It was constructed as part of the Vittala Temple complex, which is dedicated to Lord Vittala, a form of Vishnu. The chariot was designed to be a shrine for Garuda, the mythical eagle who serves as the mount of Lord Vishnu. The monument survived the destruction of Hampi in 1565 when the Vijayanagara Empire fell to the Deccan Sultanates.",
    architecture:
      "The Stone Chariot is not carved from a single stone but is built with many giant granite blocks. The joints are cleverly hidden, giving it the appearance of being carved from a single stone. The chariot stands on a platform that has intricate carvings depicting battle scenes and mythological narratives. Originally, the chariot had stone wheels that could actually rotate on their axles, but they have been fixed in place to prevent damage. The chariot is drawn by two elephants (which were originally horses that were later replaced).",
    significance:
      "The Stone Chariot is not just an architectural marvel but also a symbol of the artistic and cultural zenith reached during the Vijayanagara Empire. It represents the high level of craftsmanship and engineering skills possessed by the artisans of that era. The chariot is one of the most photographed monuments in Hampi and has become an iconic symbol of Indian heritage, even featured on the Indian 50 rupee note.",
    entryFee: "₹40 (Indians), ₹600 (Foreigners) - for the entire Vittala Temple Complex",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning or late afternoon offers the best lighting for photography.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "The Stone Chariot is located in the Vittala Temple Complex, about 2 km northeast of Hampi Bazaar. You can reach it by auto-rickshaw, bicycle, or by taking a coracle ride across the Tungabhadra River. Many visitors also enjoy the scenic walk from Hampi Bazaar to the Vittala Temple.",
    nearbyAttractions: [
      "Vittala Temple and Musical Pillars",
      "King's Balance",
      "Achyutaraya Temple",
      "Tungabhadra River and Coracle Rides",
      "Purandara Mantapa",
    ],
  },
  {
    id: "belur-chennakeshava-temple",
    name: "Belur Chennakeshava Temple",
    description:
      "The Chennakeshava Temple, also referred to as Keshava, Kesava or Vijayanarayana Temple of Belur, is a 12th-century Hindu temple in the Hassan district of Karnataka state, India. It was commissioned by King Vishnuvardhana in 1117 CE, on the banks of the Yagachi River in Belur. The temple is dedicated to Vishnu in the form of Chennakesava (meaning 'handsome Vishnu') and is renowned for its intricate sculptures and architectural brilliance of the Hoysala Empire.",
    location: "Belur, Hassan District, Karnataka",
    yearBuilt: "1117 CE",
    visitingHours: "7:30 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Belur+Chennakeshava+Temple",
    tags: ["Temple", "Hoysala Architecture", "Hindu Temple", "Historical Monument"],
    history:
      "The Chennakeshava Temple was built over a period of 103 years and was commissioned by King Vishnuvardhana of the Hoysala Empire in 1117 CE. It was built to commemorate the king's victory over the Cholas at Talakad. The temple was completed during the reign of Veera Ballala II, the grandson of Vishnuvardhana. The temple has survived multiple invasions and has undergone several renovations over the centuries, including those during the Vijayanagara Empire period.",
    architecture:
      "The temple is built on a star-shaped platform (jagati) typical of Hoysala architecture. The main structure is built using soapstone (chloritic schist) and features intricate carvings covering almost every available surface. The temple has a garbha griha (sanctum sanctorum), a sukhanasi (vestibule), and a navaranga (hall) with lathe-turned pillars. The outer walls are adorned with horizontal friezes depicting elephants, horses, floral scrolls, scenes from epics, and divine figures. The temple is famous for its bracket figures called madanikas or salabhanjika, which are celestial damsels carved in various dance poses.",
    significance:
      "The Chennakeshava Temple is one of the finest examples of Hoysala architecture and represents the artistic and cultural zenith of the Hoysala Empire. The temple is renowned for its intricate sculptures, with no two carvings being exactly alike. It is still an active place of worship and attracts both devotees and architecture enthusiasts from around the world. The temple is protected by the Archaeological Survey of India as a monument of national importance.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. The annual car festival in March-April is a special attraction.",
    photography: "Photography is allowed in the outer complex but may be restricted in the inner sanctum.",
    howToReach:
      "Belur is located about 220 km from Bangalore and 40 km from Hassan. The nearest railway station is Hassan Junction (38 km), and the nearest airport is Mangalore International Airport (170 km). From Hassan, you can take a bus or taxi to reach Belur.",
    nearbyAttractions: [
      "Halebidu Hoysaleswara Temple (16 km)",
      "Yagachi Dam (10 km)",
      "Chikmagalur Coffee Plantations (60 km)",
      "Shettihalli Rosary Church (40 km)",
    ],
  },
  {
    id: "halebidu-hoysaleswara-temple",
    name: "Halebidu Hoysaleswara Temple",
    description:
      "The Hoysaleswara Temple is a 12th-century Hindu temple dedicated to Lord Shiva. It was built in Halebidu (also known as Halebid) during the rule of King Vishnuvardhana of the Hoysala Empire. The temple is renowned for its intricate carvings and sculptures that cover almost every available surface, making it one of the finest examples of Hoysala architecture. Despite being incomplete, it stands as a testament to the artistic and architectural achievements of the Hoysala period.",
    location: "Halebidu, Hassan District, Karnataka",
    yearBuilt: "1121-1160 CE",
    visitingHours: "6:30 AM - 6:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Halebidu+Hoysaleswara+Temple",
    tags: ["Temple", "Hoysala Architecture", "Hindu Temple", "Historical Monument"],
    history:
      "The construction of the Hoysaleswara Temple began around 1121 CE during the reign of King Vishnuvardhana and continued during the rule of his grandson Veera Ballala II. Halebidu, then known as Dwarasamudra, was the capital of the Hoysala Empire. The temple was never completed despite 87 years of construction. The city was twice sacked and plundered by the Delhi Sultanate in the 14th century, which led to the abandonment of the temple and eventually the capital itself, giving the town its current name Halebidu, which means 'old capital' or 'ruined city' in Kannada.",
    architecture:
      "The Hoysaleswara Temple consists of two shrines, one dedicated to Hoysaleswara (King Vishnuvardhana) and the other to Shantaleswara (named after his queen, Shantala Devi). The temple is built on a platform and features two Nandi (bull) shrines facing the main shrines. The exterior walls are covered with an extraordinary array of sculptures depicting Hindu deities, scenes from epics, animals, birds, and intricate geometric patterns. The temple is famous for its 240 wall sculptures that run all along the outer wall. The lathe-turned pillars in the hall are another remarkable feature of the temple.",
    significance:
      "The Hoysaleswara Temple is considered one of the masterpieces of Hoysala architecture and represents the artistic and cultural zenith of the Hoysala Empire. The temple is renowned for its intricate sculptures, with no two carvings being exactly alike. Each sculpture tells a story from Hindu mythology or depicts aspects of daily life during the Hoysala period. The temple is protected by the Archaeological Survey of India as a monument of national importance and is being considered for UNESCO World Heritage status.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning or late afternoon offers the best lighting for photography.",
    photography: "Photography is allowed throughout the temple complex.",
    howToReach:
      "Halebidu is located about 210 km from Bangalore and 30 km from Hassan. The nearest railway station is Hassan Junction (30 km), and the nearest airport is Mangalore International Airport (180 km). From Hassan, you can take a bus or taxi to reach Halebidu.",
    nearbyAttractions: [
      "Belur Chennakeshava Temple (16 km)",
      "Kedareshwara Temple (in Halebidu)",
      "Archaeological Museum (in Halebidu)",
      "Basadi Halli (Jain Temples, 5 km)",
    ],
  },
  {
    id: "badami-cave-temples",
    name: "Badami Cave Temples",
    description:
      "The Badami Cave Temples are a complex of four Hindu, Jain, and possibly Buddhist cave temples located in Badami, Karnataka. Carved out of sandstone hills, these rock-cut temples date back to the 6th century CE and were built during the reign of the Chalukya dynasty. Each cave has a sanctum sanctorum, a mandapa (pillared outdoor hall), and a porch with columns. The caves are renowned for their intricate carvings and sculptures depicting various deities and mythological scenes.",
    location: "Badami, Bagalkot District, Karnataka",
    yearBuilt: "6th century CE (543-598 CE)",
    visitingHours: "9:00 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Badami+Cave+Temples",
    tags: ["Cave Temple", "Chalukya Architecture", "Rock-cut Architecture", "UNESCO World Heritage Tentative List"],
    history:
      "The Badami Cave Temples were carved out of sandstone hills during the reign of the Chalukya dynasty, particularly under King Pulakeshin I and his son Kirtivarman I in the 6th century CE. Badami, then known as Vatapi, was the capital of the Early Chalukyas. The caves represent some of the earliest known examples of Hindu temples in the Deccan region. The town later fell to the Pallavas in the 7th century, and subsequently changed hands between various dynasties including the Rashtrakutas, Later Chalukyas, and the Vijayanagara Empire.",
    architecture:
      "The complex consists of four caves, each carved out of the soft Badami sandstone of the hillside. Cave 1 is dedicated to Lord Shiva and features an 18-armed Nataraja performing the Tandava dance. Cave 2 is dedicated to Lord Vishnu, with depictions of Vishnu as Trivikrama and Vamana. Cave 3, the largest and most ornate, is also dedicated to Vishnu, featuring carvings of Vishnu as Narasimha and Varaha. Cave 4 is dedicated to Jain Tirthankaras. The caves feature intricate pillars, brackets, and ceiling panels with detailed carvings. The architecture shows influences of both North Indian Nagara style and South Indian Dravidian style.",
    significance:
      "The Badami Cave Temples represent an important transition in the development of temple architecture in India. They showcase the early experimentation with rock-cut architecture in the Deccan region and the blending of northern and southern architectural styles. The sculptures and carvings provide valuable insights into the religious practices, clothing styles, and performing arts of the period. The caves are particularly noted for their depictions of Vishnu and Shiva in various forms, as well as scenes from Hindu mythology.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning offers the best lighting for photography.",
    photography: "Photography is allowed throughout the cave complex.",
    howToReach:
      "Badami is located about 450 km from Bangalore and 120 km from Hubli. The nearest railway station is Badami Railway Station (5 km), and the nearest airport is Hubli Airport (120 km). From Hubli, you can take a bus or taxi to reach Badami.",
    nearbyAttractions: [
      "Badami Fort and Bhutanatha Temple",
      "Aihole Temples (35 km)",
      "Pattadakal Temples (22 km)",
      "Banashankari Temple (5 km)",
      "Agastya Lake (at the foot of the caves)",
    ],
  },
  {
    id: "pattadakal-group-of-monuments",
    name: "Pattadakal Group of Monuments",
    description:
      "The Pattadakal Group of Monuments is a UNESCO World Heritage Site located in Pattadakal, Karnataka. The site features a complex of 7th and 8th-century CE Hindu and Jain temples built by the Chalukya dynasty. These temples represent a unique blend of architectural styles from northern (Nagara) and southern (Dravidian) India. The most notable among them is the Virupaksha Temple, built by Queen Lokamahadevi to commemorate her husband's victory over the Pallavas.",
    location: "Pattadakal, Bagalkot District, Karnataka",
    yearBuilt: "7th-8th century CE",
    visitingHours: "9:00 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Pattadakal+Group+of+Monuments",
    tags: ["UNESCO World Heritage", "Temple Complex", "Chalukya Architecture", "Hindu Temples"],
    history:
      "Pattadakal served as the ceremonial center where Chalukya kings were crowned. The construction of temples began in the 7th century CE and continued through the 8th century under various Chalukya rulers. The most significant period of construction was during the reign of King Vikramaditya II (733-744 CE) and his queen Lokamahadevi, who built the Virupaksha Temple to commemorate their victory over the Pallavas of Kanchipuram. The site later came under the control of the Rashtrakutas and subsequently declined in importance.",
    architecture:
      "The temple complex at Pattadakal showcases the evolution and experimentation in Chalukyan temple architecture. It features both Nagara (North Indian) and Dravidian (South Indian) architectural styles, as well as a fusion of these styles. The Virupaksha Temple, the largest in the complex, is built in the Dravidian style and features a large courtyard, a sanctum with a circumambulatory path, and elaborate sculptural work. The Papanatha Temple represents a blend of northern and southern styles. Other notable structures include the Sangameshvara Temple, Mallikarjuna Temple, and Kashivishvanatha Temple. The temples are known for their intricate carvings depicting scenes from Hindu epics and various deities.",
    significance:
      "The Pattadakal Group of Monuments is of exceptional historical and architectural importance as it represents the high point of an eclectic art which, in the 7th and 8th centuries CE, achieved a harmonious blend of architectural forms from the north and south of India. The site demonstrates the evolution of temple architecture and the experimentation with different styles during the Chalukya period. UNESCO recognized its universal value and inscribed it as a World Heritage Site in 1987.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning or late afternoon offers the best lighting for photography.",
    photography: "Photography is allowed throughout the temple complex.",
    howToReach:
      "Pattadakal is located about 470 km from Bangalore, 22 km from Badami, and 140 km from Hubli. The nearest railway station is Badami Railway Station (22 km), and the nearest airport is Hubli Airport (140 km). From Badami, you can take a bus or taxi to reach Pattadakal.",
    nearbyAttractions: [
      "Badami Cave Temples (22 km)",
      "Aihole Temples (14 km)",
      "Mahakuta Temple Complex (15 km)",
      "Banashankari Temple (26 km)",
    ],
  },
  {
    id: "aihole-temples",
    name: "Aihole Temples",
    description:
      "Aihole is an ancient temple complex located in the Bagalkot district of Karnataka, India. Often referred to as the 'Cradle of Indian Temple Architecture,' it contains over 125 stone temples dating from the 4th to the 12th century CE. These temples represent the experimental phase of temple architecture in the Deccan region, showcasing various architectural styles and innovations that later evolved into the mature Chalukyan and Dravidian styles.",
    location: "Aihole, Bagalkot District, Karnataka",
    yearBuilt: "4th-12th century CE",
    visitingHours: "9:00 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Aihole+Temples",
    tags: ["Temple Complex", "Chalukya Architecture", "Archaeological Site", "UNESCO World Heritage Tentative List"],
    history:
      "Aihole was the first capital of the Early Chalukyas, who laid the foundation for temple architecture in the Deccan region. The earliest temples date back to the 4th century CE, but most of the structures were built between the 6th and 8th centuries during the reign of the Chalukya dynasty. Aihole was an important commercial center and a major learning hub, particularly for architecture. The city was also known as 'Ayyavole' and was mentioned in inscriptions as a trade guild called the 'Ayyavole 500,' which controlled much of the trade in South and Southeast Asia.",
    architecture:
      "The temples at Aihole represent various experimental styles and forms, including the early Nagara style, Dravidian style, and a unique blend of both. The most famous temple is the Durga Temple (8th century), which despite its name is dedicated to Vishnu and features a distinctive horseshoe-shaped apsidal plan with a pillared corridor running around the sanctum. Other notable structures include the Lad Khan Temple (one of the oldest, built like a Panchayat hall), the Meguti Jain Temple (the only dated temple, 634 CE), the Huchimalli Temple, the Galaganatha Temple group, and the Ravana Phadi cave temple. The temples feature intricate carvings depicting various deities, mythological scenes, and decorative motifs.",
    significance:
      "Aihole is of immense historical and architectural importance as it represents the experimental phase of Indian temple architecture. The temples showcase the evolution of various architectural styles and techniques that later matured into the classic Chalukyan and Dravidian temple architecture. The site provides valuable insights into the religious practices, artistic traditions, and cultural life of early medieval India. Aihole, along with Pattadakal and Badami, forms part of the 'Chalukyan trilogy' that is on UNESCO's tentative list for World Heritage status.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning offers the best lighting for photography.",
    photography: "Photography is allowed throughout the temple complex.",
    howToReach:
      "Aihole is located about 480 km from Bangalore, 35 km from Badami, and 14 km from Pattadakal. The nearest railway station is Badami Railway Station (35 km), and the nearest airport is Hubli Airport (150 km). From Badami, you can take a bus or taxi to reach Aihole.",
    nearbyAttractions: [
      "Pattadakal Group of Monuments (14 km)",
      "Badami Cave Temples (35 km)",
      "Mahakuta Temple Complex (30 km)",
      "Banashankari Temple (40 km)",
    ],
  },
  {
    id: "bijapur-gol-gumbaz",
    name: "Bijapur Gol Gumbaz",
    description:
      "Gol Gumbaz is the mausoleum of Mohammed Adil Shah, Sultan of Bijapur. Located in Bijapur, Karnataka, it was completed in 1656 and is one of the largest single chamber structures in the world. The most remarkable feature of the monument is its central dome, which stands without any pillars for support and is the second largest dome in the world after St. Peter's Basilica in Rome. The dome houses the famous 'Whispering Gallery' where even the slightest sound is echoed multiple times.",
    location: "Bijapur (Vijayapura), Karnataka",
    yearBuilt: "1626-1656",
    visitingHours: "8:00 AM - 6:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Bijapur+Gol+Gumbaz",
    tags: ["Mausoleum", "Adil Shahi Architecture", "Dome", "Whispering Gallery"],
    history:
      "Gol Gumbaz was commissioned by Mohammed Adil Shah, the seventh sultan of the Adil Shahi dynasty, before his death in 1656. The construction began around 1626 and took 30 years to complete. The architect was Yaqut of Dabul. The building was designed to serve as the mausoleum for the sultan and his family members. The Adil Shahi dynasty ruled the Sultanate of Bijapur from 1489 to 1686, after which the Mughal Empire annexed the region. The monument represents the culmination of Adil Shahi architectural style, which blended elements from Persian, Ottoman, and local Indian traditions.",
    architecture:
      "Gol Gumbaz is a cube-shaped structure with octagonal towers at each corner, topped by a massive hemispherical dome. The dome has a diameter of 44 meters and is supported by eight intersecting arches that create interlocking pendentives. This innovative structural system allows the dome to stand without pillars. The walls are 3 meters thick, which helps support the weight of the dome. The building stands on a platform and has a total height of 51 meters. Inside, there is a square chamber measuring 41 meters on each side, with the tomb of Mohammed Adil Shah and his family members in the center. The most famous feature is the 'Whispering Gallery' that runs around the inside of the dome, where even the slightest sound can be heard clearly on the opposite side due to acoustic effects.",
    significance:
      "Gol Gumbaz is not just an architectural marvel but also a testament to the advanced engineering and acoustic knowledge of the time. It represents the zenith of Adil Shahi architecture and is one of the most important Islamic monuments in India. The dome's construction without central supports was a remarkable achievement for its time. The Whispering Gallery demonstrates the sophisticated understanding of acoustics in medieval India. The monument is protected by the Archaeological Survey of India and is one of the most visited historical sites in Karnataka.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning is best to avoid crowds at the Whispering Gallery.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "Bijapur (now officially called Vijayapura) is located about 530 km from Bangalore and 200 km from Pune. The nearest railway station is Bijapur Railway Station (3 km), and the nearest major airport is Pune Airport (200 km). Bijapur is well-connected by road to major cities in Karnataka and Maharashtra.",
    nearbyAttractions: [
      "Ibrahim Rauza",
      "Bara Kaman",
      "Jama Masjid of Bijapur",
      "Malik-e-Maidan (one of the largest medieval cannons)",
      "Upli Buruj (watchtower)",
    ],
  },
  {
    id: "shravanabelagola",
    name: "Shravanabelagola",
    description:
      "Shravanabelagola is a renowned Jain pilgrimage center located in Hassan district of Karnataka. It is home to one of the world's largest monolithic statues - the 57-foot tall statue of Gommateshwara (Lord Bahubali), which stands atop the Vindhyagiri Hill. The statue was commissioned by Chamundaraya, a minister of the Ganga Dynasty, in 983 CE. The site also includes numerous Jain temples and monuments spread across two hills, Vindhyagiri and Chandragiri, and is a significant center for the study of Jain religion and culture.",
    location: "Hassan District, Karnataka",
    yearBuilt: "983 CE (Gommateshwara statue)",
    visitingHours: "6:00 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Shravanabelagola",
    tags: ["Jain Pilgrimage", "Monolithic Statue", "Religious Site", "Historical Monument"],
    history:
      "Shravanabelagola has been a center of Jain religion and culture for over 2,000 years. The most significant monument, the Gommateshwara statue, was commissioned by Chamundaraya, a minister and commander of the Ganga Dynasty king Rachamalla, in 983 CE. According to legend, Chamundaraya had a dream in which he saw the image of Gommateshwara on the hill. The site gained prominence during the Ganga, Hoysala, and Vijayanagara periods. The Mahamastakabhisheka, a grand head-anointing ceremony, is performed once every 12 years, attracting Jain devotees from around the world. The last ceremony was held in 2018, and the next is scheduled for 2030.",
    architecture:
      "The main attraction is the 57-foot tall monolithic statue of Gommateshwara (Lord Bahubali), carved from a single block of granite. The statue depicts Bahubali in the kayotsarga posture, standing completely naked in accordance with the Digambara tradition of Jainism. The statue's features include curly hair, long ears, and a serene facial expression. Vines are carved around his legs and arms, and ant hills rise at his feet, symbolizing his long meditation. The Chandragiri Hill contains numerous Jain temples and monuments, including the Chandragupta Basadi (built in memory of Emperor Chandragupta Maurya who spent his last days here as a Jain monk) and the Chamundaraya Basadi. The Vindhyagiri Hill, besides hosting the Gommateshwara statue, also has other structures like the Odegal Basadi and Siddhara Gundi (a cave with footprints of several Jain saints).",
    significance:
      "Shravanabelagola is one of the most important Jain pilgrimage sites and a significant center for the study of Jain religion and culture. The Gommateshwara statue is not only a religious icon but also a masterpiece of Indian art and architecture. It represents the Jain ideals of non-violence, self-control, and renunciation. The site has played a crucial role in the preservation and propagation of Jain literature and philosophy. The Mahamastakabhisheka ceremony, performed once every 12 years, is a spectacular event that attracts thousands of devotees and tourists from around the world.",
    entryFee: "₹20 (Indians), ₹100 (Foreigners) - for climbing Vindhyagiri Hill",
    bestTimeToVisit:
      "October to February when the weather is pleasant. The Mahamastakabhisheka ceremony, held once every 12 years, is a special attraction.",
    photography: "Photography is allowed throughout the complex.",
    howToReach:
      "Shravanabelagola is located about 150 km from Bangalore and 80 km from Mysore. The nearest railway station is Hassan Junction (52 km), and the nearest airport is Bangalore International Airport (170 km). Regular buses operate from Bangalore, Mysore, and Hassan to Shravanabelagola.",
    nearbyAttractions: [
      "Belur Chennakeshava Temple (83 km)",
      "Halebidu Hoysaleswara Temple (94 km)",
      "Sravanabelagola Museum",
      "Bhadrabahu Cave on Chandragiri Hill",
      "Tyagada Brahmadeva Pillar",
    ],
  },
  {
    id: "chitradurga-fort",
    name: "Chitradurga Fort",
    description:
      "Chitradurga Fort, also known as Kallina Kote (Stone Fortress), is a massive fortification that sprawls across several hills in Chitradurga, Karnataka. Built in stages between the 10th and 18th centuries, it is known for its ingenious defensive architecture featuring seven concentric fortification walls, numerous bastions, secret passages, and elaborate water harvesting systems. The fort is associated with the legendary Onake Obavva, a woman who single-handedly defended a narrow passage into the fort against Hyder Ali's soldiers using only a pestle (onake).",
    location: "Chitradurga, Karnataka",
    yearBuilt: "10th-18th century",
    visitingHours: "9:00 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Chitradurga+Fort",
    tags: ["Fort", "Military Architecture", "Historical Monument", "Archaeological Site"],
    history:
      "The Chitradurga Fort has a rich history spanning several dynasties. The initial structures were built by the Chalukyas and Hoysalas in the 10th century. It was later expanded by the Nayakas of Chitradurga (Palegar dynasty), who ruled from the 15th to the 18th century and were known as 'Bedas' or hunter-warriors. The fort reached its zenith under Madakari Nayaka V, the last ruler of the Nayaka dynasty. In 1779, the fort fell to Hyder Ali of Mysore after a prolonged siege. Later, it came under British control following the defeat of Tipu Sultan in 1799. The fort is famous for the story of Onake Obavva, who defended a narrow passage into the fort against Hyder Ali's soldiers in 1779 by killing them one by one as they tried to enter through a small crevice.",
    architecture:
      "The Chitradurga Fort is built on a cluster of hills called Chitrakaldurga, with granite stones as the primary building material. It has seven concentric fortification walls, 19 gateways, 38 posterior entrances, 35 secret entrances, 4 invisible passages, and numerous bastions. The fort's defensive architecture includes multiple layers of walls with strategic gaps and turns designed to trap and confuse invaders. The fort also features an elaborate water management system with 25 water tanks (kalyani), ensuring water supply during long sieges. Notable structures within the fort include the Hidimbeshwara Temple, Sampige Siddeshwara Temple, Ekanatha Rammandir, Murugarajendra Matha, and the palace of Madakari Nayaka. The fort also has several granaries, oil pits, and storehouses that could sustain a large garrison for extended periods.",
    significance:
      "Chitradurga Fort is one of the most impressive military architectures in South India and represents the zenith of defensive fortification design. It showcases the engineering and strategic planning skills of medieval Indian architects and military planners. The fort is also significant for its water harvesting and management systems, which were advanced for their time. The story of Onake Obavva has become a symbol of courage and patriotism in Karnataka. The fort is protected by the Archaeological Survey of India and is a popular tourist destination and film shooting location.",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning or late afternoon offers the best lighting for photography.",
    photography: "Photography is allowed throughout the fort complex.",
    howToReach:
      "Chitradurga is located about 200 km from Bangalore on the Bangalore-Pune National Highway (NH-4). The nearest railway station is Chitradurga Railway Station (3 km), and the nearest airport is Bangalore International Airport (200 km). Regular buses operate from Bangalore, Mysore, and other major cities to Chitradurga.",
    nearbyAttractions: [
      "Chandravalli Caves (3 km)",
      "Jogimatti Hill and Wildlife Sanctuary (10 km)",
      "Vani Vilas Sagar Dam (25 km)",
      "Brahmagiri (Mythology says this is where Lord Parasurama's axe fell)",
      "Hiriyur Veerabhadra Temple (40 km)",
    ],
  },
  {
    id: "bangalore-fort",
    name: "Bangalore Fort",
    description:
      "The Bangalore Fort was originally built as a mud fort by Kempe Gowda I, the founder of Bangalore, in 1537. It was later rebuilt in stone by Hyder Ali in 1761. The fort played a significant role in the Anglo-Mysore Wars. Today, only the Delhi Gate and remnants of two bastions remain of what was once a large fortification. The surviving structures are located near the City Market area in Bangalore and are protected by the Archaeological Survey of India.",
    location: "City Market Area, Bangalore, Karnataka",
    yearBuilt: "1537 (original mud fort), 1761 (stone reconstruction)",
    visitingHours: "8:30 AM - 5:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Bangalore+Fort",
    tags: ["Fort", "Historical Monument", "Archaeological Site"],
    history:
      "The original mud fort was built by Kempe Gowda I, a feudatory of the Vijayanagara Empire and the founder of Bangalore, in 1537. The fort marked the boundaries of the new town he established. In 1761, Hyder Ali, the ruler of Mysore, received the fort as a jagir (feudal land grant) from the Mughals and renovated it into a stone structure. His son Tipu Sultan further strengthened the fort. During the Third Anglo-Mysore War in 1791, the fort was captured by the British forces under Lord Cornwallis. After Tipu Sultan's death in the Fourth Anglo-Mysore War in 1799, the British dismantled most of the fort, leaving only the Delhi Gate and portions of two bastions intact.",
    architecture:
      "The original fort built by Kempe Gowda I was oval in shape with eight gates and was constructed of mud. Hyder Ali's reconstruction transformed it into a stone fort with strong walls, bastions, and gates. The fort was designed in the Indo-Islamic military architectural style prevalent in the 18th century. The surviving Delhi Gate is built of granite and features pointed arches. The gate structure includes guard rooms and a central passage that once had a drawbridge. The remaining bastions show the thickness of the walls and the strategic design of the fortification.",
    significance:
      "The Bangalore Fort is a significant historical monument that represents the military and political history of the region. It played a crucial role in the Anglo-Mysore Wars, which were pivotal in establishing British dominance in South India. The fort is also important as it marks the site where the city of Bangalore was founded by Kempe Gowda I. Despite its reduced state, the remaining structures provide valuable insights into the military architecture and defensive strategies of the 18th century. The fort is protected by the Archaeological Survey of India as a monument of national importance.",
    entryFee: "Free",
    bestTimeToVisit:
      "October to February when the weather is pleasant. Early morning is best to avoid the crowds in the City Market area.",
    photography: "Photography is allowed at the site.",
    howToReach:
      "The Bangalore Fort is located in the City Market area of Bangalore, about 4 km from Majestic Bus Station and 2 km from Bangalore City Railway Station. It is easily accessible by local buses, auto-rickshaws, and taxis from any part of the city.",
    nearbyAttractions: [
      "Tipu Sultan's Summer Palace (1 km)",
      "Kote Venkataramana Temple (within the old fort area)",
      "City Market (0.5 km)",
      "Lalbagh Botanical Garden (3 km)",
      "Bangalore Palace (7 km)",
    ],
  },
  {
    id: "tipu-sultan-summer-palace-bangalore",
    name: "Tipu Sultan Summer Palace Bangalore",
    description:
      "Tipu Sultan's Summer Palace is an example of Indo-Islamic architecture located in Bangalore, Karnataka. Built in 1791, it served as the summer residence of Tipu Sultan, the ruler of Mysore. The palace is entirely made of teak wood and features elaborate floral motifs adorning the walls and ceilings. Today, the palace houses a museum that displays artifacts related to Tipu Sultan and the Mysore Sultanate, including paintings, clothes, coins, and military items.",
    location: "Albert Victor Road, Bangalore, Karnataka",
    yearBuilt: "1791",
    visitingHours: "8:30 AM - 5:30 PM (Closed on Sundays)",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Tipu+Sultan+Summer+Palace+Bangalore",
    tags: ["Palace", "Indo-Islamic Architecture", "Museum", "Historical Monument"],
    history:
      "The Summer Palace was built during the reign of Tipu Sultan, the ruler of Mysore from 1782 to 1799. Construction began in 1781 and was completed in 1791. Tipu Sultan used this palace as his summer residence and for conducting official business during the hot months. The palace was located within the walls of the Bangalore Fort, which was originally built by Kempe Gowda I and later strengthened by Hyder Ali, Tipu's father. After Tipu Sultan's defeat and death in the Fourth Anglo-Mysore War in 1799, the British used the palace for their secretariat before moving to Attara Kacheri (the current High Court building) in 1868. The palace was restored by the Archaeological Survey of India in the 20th century and opened as a museum.",
    architecture:
      "The palace is a two-story structure built entirely of teak wood, with pillars, arches, and balconies showcasing the Indo-Islamic architectural style. The ground floor has four quadrangles with wooden pillars, while the first floor has a large central hall and smaller rooms on either side. The walls and ceilings are adorned with floral motifs painted in vibrant colors. The palace features several balconies with intricately carved wooden railings. The structure sits on a stone platform and is surrounded by a garden. The palace's design incorporates elements of Mysore, Islamic, and Rajput architectural styles, reflecting the cultural synthesis of the time.",
    significance:
      "Tipu Sultan's Summer Palace is an important historical monument that represents the cultural and architectural heritage of the Mysore Sultanate. Tipu Sultan, known as the 'Tiger of Mysore,' was a significant historical figure who resisted British colonial expansion in South India. The palace provides insights into the lifestyle, art, and architecture of the late 18th century. The museum housed within the palace displays various artifacts related to Tipu Sultan, including his clothes, crown, coins, paintings, and weapons, offering a glimpse into the history of the Mysore Sultanate. The palace is protected by the Archaeological Survey of India as a monument of national importance.",
    entryFee: "₹15 (Indians), ₹200 (Foreigners)",
    bestTimeToVisit: "October to February when the weather is pleasant. Early morning is best to avoid crowds.",
    photography:
      "Photography is allowed inside the palace complex, but may be restricted in certain areas of the museum.",
    howToReach:
      "The palace is located in the City Market area of Bangalore, about 4 km from Majestic Bus Station and 2 km from Bangalore City Railway Station. It is easily accessible by local buses, auto-rickshaws, and taxis from any part of the city.",
    nearbyAttractions: [
      "Bangalore Fort (0.5 km)",
      "Kote Venkataramana Temple (1 km)",
      "City Market (0.5 km)",
      "Lalbagh Botanical Garden (3 km)",
      "Bangalore Palace (7 km)",
    ],
  },
  {
    id: "melukote-cheluvanarayana-temple",
    name: "Melukote Cheluvanarayana Temple",
    description:
      "The Cheluvanarayana Temple, also known as Thirunarayanapura, is an ancient temple located in Melukote, Karnataka. Dedicated to Lord Vishnu in the form of Cheluvanarayana (also called Thirunarayana), the temple dates back to the 12th century and was renovated by the Hoysala king Vishnuvardhana. The temple is famous for its annual Vairamudi festival, during which the deity is adorned with a diamond-studded crown. Melukote is also known as a center of Sanskrit learning and Srivaishnava philosophy, established by the great Vaishnava saint Sri Ramanujacharya.",
    location: "Melukote, Mandya District, Karnataka",
    yearBuilt: "12th century (with later renovations)",
    visitingHours: "7:30 AM - 12:30 PM, 4:00 PM - 8:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Melukote+Cheluvanarayana+Temple",
    tags: ["Temple", "Hoysala Architecture", "Hindu Temple", "Religious Site"],
    history:
      "The temple has a rich history dating back to the 12th century. According to legend, the idol of Cheluvanarayana was worshipped by Lord Rama and was later lost. It was rediscovered by Sri Ramanujacharya in the 12th century. The temple gained prominence during the Hoysala period when King Vishnuvardhana, who converted from Jainism to Vaishnavism under the influence of Ramanujacharya, renovated and expanded it. The temple continued to receive patronage from the Vijayanagara Empire and the Wodeyar dynasty of Mysore.",
    architecture:
      "The temple is built in the Dravidian architectural style with influences of Hoysala architecture. It features a tall gopuram (tower) at the entrance, several mandapas (halls), and a sanctum sanctorum housing the deity. The temple complex includes several smaller shrines and a large pushkarini (temple tank) called Kalyani. The main deity, Cheluvanarayana, is made of a rare composition called Asta Datu (eight metals). The temple walls and pillars feature intricate carvings depicting various forms of Vishnu and scenes from Hindu mythology.",
    significance:
      "The Cheluvanarayana Temple is one of the most important Vishnu temples in South India and a significant pilgrimage site for followers of Sri Vaishnavism. The temple is associated with Sri Ramanujacharya, who lived in Melukote for 12 years and established it as a center for Vishishtadvaita philosophy. The annual Vairamudi festival, during which the deity wears a diamond-studded crown (believed to be gifted by the Lord himself), attracts thousands of devotees. The temple is also known for its collection of ancient jewelry and artifacts, some dating back to the Hoysala period.",
    entryFee: "Free",
    bestTimeToVisit: "October to March. The Vairamudi festival (usually in March-April) is a special attraction.",
    photography: "Photography is restricted inside the main temple.",
    howToReach:
      "Melukote is located about 150 km from Bangalore and 40 km from Mysore. The nearest railway station is Mysore Junction (40 km), and the nearest airport is Bangalore International Airport (150 km). Regular buses operate from Bangalore and Mysore to Melukote.",
    nearbyAttractions: [
      "Yoga Narasimha Temple (on the hilltop in Melukote)",
      "Academy of Sanskrit Research",
      "Kalyani (sacred pond)",
      "Raya Gopura",
      "Melukote Wildlife Sanctuary",
    ],
  },
  {
    id: "murudeshwar-temple",
    name: "Murudeshwar Temple",
    description:
      "Murudeshwar Temple is a Hindu temple dedicated to Lord Shiva, located in the town of Murudeshwar in Karnataka. The temple is famous for housing the second tallest Shiva statue in the world, standing at 123 feet (37.5 meters). Built on the Kanduka Hill which is surrounded on three sides by the Arabian Sea, the temple offers breathtaking views and is a popular pilgrimage and tourist destination. The temple complex also features a 20-story gopuram (tower), one of the tallest in India.",
    location: "Murudeshwar, Uttara Kannada District, Karnataka",
    yearBuilt: "Ancient temple with modern renovations (statue erected in 2006)",
    visitingHours: "6:00 AM - 8:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Murudeshwar+Temple",
    tags: ["Temple", "Hindu Temple", "Shiva Statue", "Coastal Temple"],
    history:
      "According to Hindu mythology, this is the site where Lord Shiva gave the Atma Linga to Ravana, and where Ravana placed it down on the ground while performing ablutions. When he tried to lift it again, it had become firmly rooted to the spot. The original temple is believed to be ancient, but the current grand structure is the result of extensive renovations and additions sponsored by businessman and philanthropist R.N. Shetty in the late 20th and early 21st centuries. The massive Shiva statue was erected in 2006.",
    architecture:
      "The temple complex features a blend of ancient and modern architectural elements. The main attraction is the 123-foot tall Shiva statue, made of concrete and painted white, depicting Lord Shiva seated in meditation. The statue is positioned such that it faces the Arabian Sea. The temple also boasts a 20-story gopuram (tower) decorated with intricate carvings of deities and scenes from Hindu mythology. The gopuram houses an elevator that takes visitors to the top for panoramic views of the Arabian Sea and the statue. The temple sanctum houses a Shiva Linga, and the walls of the temple complex feature elaborate relief sculptures depicting scenes from Hindu epics.",
    significance:
      "Murudeshwar Temple is a significant pilgrimage site for Hindus, particularly devotees of Lord Shiva. According to legend, it is one of the places where pieces of the original Atma Linga fell when Lord Ganesha tricked Ravana. The temple's location on a hill surrounded by the Arabian Sea makes it a unique and picturesque spiritual destination. The massive Shiva statue and gopuram have made it an iconic landmark and a popular tourist attraction in coastal Karnataka.",
    entryFee: "Free for temple; ₹10 for gopuram elevator",
    bestTimeToVisit:
      "October to March when the weather is pleasant. Maha Shivaratri (February-March) is a special occasion.",
    photography: "Photography is allowed in the temple complex but may be restricted inside the main shrine.",
    howToReach:
      "Murudeshwar is located about 165 km from Mangalore and 450 km from Bangalore. The nearest railway station is Murudeshwar Railway Station (1 km), which is well-connected to major cities. The nearest airport is Mangalore International Airport (165 km). Regular buses operate from Mangalore, Udupi, and other nearby towns to Murudeshwar.",
    nearbyAttractions: [
      "Netrani Island (for scuba diving, 10 km offshore)",
      "Murudeshwar Beach",
      "Bhatkal (historic town, 16 km)",
      "Idagunji Mahaganapathi Temple (20 km)",
      "Kollur Mookambika Temple (85 km)",
    ],
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    description:
      "Hawa Mahal is a palace in the city of Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers.",
    location: "Jaipur, Rajasthan",
    yearBuilt: "1799",
    visitingHours: "9:00 AM - 4:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Hawa+Mahal",
    tags: ["Palace", "Rajput Architecture", "Pink City"],
    history:
      "Hawa Mahal was built in 1799 by Maharaja Sawai Pratap Singh, the grandson of Maharaja Sawai Jai Singh, who founded the city of Jaipur. The palace was designed by Lal Chand Ustad and was built as an extension of the City Palace. It was constructed to allow the royal ladies to observe street festivities while unseen from the outside, as they had to observe strict purdah (seclusion).",
    architecture:
      "Hawa Mahal is built in the form of a crown, representing the crown of Lord Krishna. The palace has 953 small windows (jharokhas) decorated with intricate latticework. The windows allow cool air to pass through, giving the palace its name 'Hawa Mahal' (Palace of Winds). The five-story structure is made of red and pink sandstone and features a unique honeycomb design with overhanging balconies and arched roofs.",
    significance:
      "Hawa Mahal is one of the most iconic landmarks of Jaipur and represents the unique blend of Rajput and Mughal architecture. The palace is a symbol of the rich cultural heritage of Rajasthan and showcases the artistic and architectural skills of the craftsmen of that era. It is also a testament to the social customs and lifestyle of the royal families of Rajasthan.",
    entryFee: "₹50 (Indians), ₹200 (Foreigners)",
    bestTimeToVisit: "October to March. Early morning visits offer the best lighting and fewer crowds.",
    photography: "Photography is allowed from the outside. Inside photography may be restricted in certain areas.",
    howToReach:
      "Hawa Mahal is located in the heart of Jaipur's Pink City. The nearest airport is Jaipur International Airport (12 km), and the nearest railway station is Jaipur Junction (3 km). The palace is easily accessible by auto-rickshaws, taxis, and buses from all parts of Jaipur.",
    nearbyAttractions: [
      "City Palace (adjacent)",
      "Jantar Mantar (500 m)",
      "Amber Fort (11 km)",
      "Nahargarh Fort (6 km)",
      "Jal Mahal (6 km)",
    ],
    architecturalFeatures: [
      "953 jharokhas (windows)",
      "Crown-shaped design",
      "Honeycomb structure",
      "Lattice work",
      "Overhanging balconies",
      "Arched roofs",
      "Red and pink sandstone",
    ],
  },
  {
    id: "ayodhya-ram-mandir",
    name: "Ayodhya Ram Mandir",
    description:
      "The Ram Mandir is a Hindu temple complex under construction in Ayodhya, Uttar Pradesh, India, at the site of Ram Janmabhoomi, the mythical birthplace of Rama, a principal deity of Hinduism. The temple is being constructed by the Shri Ram Janmabhoomi Teerth Kshetra. The temple's construction began after the Supreme Court of India delivered the final verdict on the Ayodhya dispute in November 2019, allowing the construction of a Ram temple at the disputed site.",
    location: "Ayodhya, Uttar Pradesh",
    yearBuilt: "2020-2024 (under construction)",
    visitingHours: "6:00 AM - 7:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Ayodhya+Ram+Mandir",
    tags: ["Hindu Temple", "Modern Architecture", "Religious Site", "Under Construction"],
    history:
      "The site has been a matter of dispute for centuries. According to Hindu belief, it is the birthplace of Lord Rama. The Babri Masjid stood at this site from 1528 until its demolition in 1992. After decades of legal battles, the Supreme Court of India in 2019 awarded the site for the construction of a Ram temple. The foundation stone was laid by Prime Minister Narendra Modi on August 5, 2020.",
    architecture:
      "The temple is being built in the traditional Nagara style of Hindu temple architecture. It will be a three-story structure with a height of 161 feet, length of 380 feet, and width of 250 feet. The temple will have five domes and will be supported by 392 pillars and 44 gates. The construction uses pink sandstone from Bansi Paharpur in Rajasthan and marble from Makrana.",
    significance:
      "The Ram Mandir holds immense religious and cultural significance for Hindus worldwide. It represents the culmination of a centuries-old aspiration and is considered one of the most important religious sites in Hinduism. The temple's construction marks the end of a long-standing dispute and is seen as a symbol of faith and devotion.",
    entryFee: "Free",
    bestTimeToVisit: "October to March when the weather is pleasant.",
    photography: "Photography rules will be established upon completion.",
    howToReach:
      "Ayodhya is well-connected by road and rail. The nearest airport is Faizabad Airport (6 km). Regular trains connect Ayodhya to major cities across India.",
    nearbyAttractions: ["Hanuman Garhi", "Kanak Bhawan", "Dashrath Mahal", "Sita Ki Rasoi"],
    architecturalFeatures: [
      "Nagara style architecture",
      "Three-story structure",
      "Five domes",
      "392 pillars",
      "44 gates",
      "Pink sandstone construction",
      "Makrana marble",
    ],
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    description:
      "Amber Fort, also known as Amer Fort, is a fort located in Amer, Rajasthan, India. Amber Fort is known for its artistic style elements. With its large ramparts and series of gates and cobbled paths, the fort overlooks Maota Lake, which is the main source of water for the Amer Palace. Constructed of red sandstone and marble, the attractive, opulent palace is laid out on four levels, each with a courtyard.",
    location: "Amer, Jaipur, Rajasthan",
    yearBuilt: "1592",
    visitingHours: "8:00 AM - 6:00 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Amber+Fort",
    tags: ["Fort", "Rajput Architecture", "Palace", "UNESCO World Heritage"],
    history:
      "Amber Fort was built by Raja Man Singh I, one of the trusted generals of Emperor Akbar, in 1592. The fort served as the main residence of the Rajput Maharajas and their families. Over the centuries, the fort was expanded and renovated by successive rulers. The fort was the capital of the Kachwaha Rajputs until Jaipur was established as the new capital in 1727.",
    architecture:
      "The fort is built with red sandstone and marble and consists of four main sections, each with its own courtyard. The Diwan-e-Aam (Hall of Public Audience), Diwan-e-Khas (Hall of Private Audience), Sheesh Mahal (Mirror Palace), and Sukh Niwas are the main attractions. The fort showcases a blend of Hindu and Mughal architectural styles. The Sheesh Mahal is particularly famous for its intricate mirror work.",
    significance:
      "Amber Fort is one of the finest examples of Rajput architecture and represents the grandeur and opulence of the Rajput rulers. It is part of the Hill Forts of Rajasthan, which were collectively designated as a UNESCO World Heritage Site in 2013. The fort is also famous for its elephant rides and light and sound show.",
    entryFee: "₹100 (Indians), ₹550 (Foreigners)",
    bestTimeToVisit: "October to March. The light and sound show in the evening is a special attraction.",
    photography: "Photography is allowed throughout the fort complex.",
    howToReach:
      "Amber Fort is located about 11 km from Jaipur city center. It is easily accessible by road, and elephant rides are available from the base of the fort to the main entrance.",
    nearbyAttractions: ["Jaigarh Fort", "Nahargarh Fort", "Jaipur City Palace", "Hawa Mahal", "Jal Mahal"],
    architecturalFeatures: [
      "Red sandstone and marble construction",
      "Four-level layout",
      "Sheesh Mahal (Mirror Palace)",
      "Diwan-e-Aam and Diwan-e-Khas",
      "Sukh Niwas",
      "Ganesh Gate",
      "Sila Devi Temple",
    ],
  },
  {
    id: "brihadeeswara-temple",
    name: "Brihadeeswara Temple",
    description:
      "The Brihadeeswara Temple, also called Rajarajeswaram or Peruvudaiyar Kovil, is a Hindu temple dedicated to Shiva located in Thanjavur, Tamil Nadu, India. It is one of the largest South Indian temples and an exemplary example of a fully realized Dravidian architecture. Built by Raja Raja Chola I between 1003 and 1010 CE, the temple is a part of the UNESCO World Heritage Site known as the 'Great Living Chola Temples'.",
    location: "Thanjavur, Tamil Nadu",
    yearBuilt: "1003-1010 CE",
    visitingHours: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Brihadeeswara+Temple",
    tags: ["UNESCO World Heritage", "Hindu Temple", "Chola Architecture", "Dravidian Style"],
    history:
      "The Brihadeeswara Temple was built by Raja Raja Chola I (985-1014 CE) and completed in 1010 CE. It was built to commemorate the military victories of the Chola empire and to serve as the royal temple. The temple was originally called Rajarajeswaram after its patron. It has been a center of worship for over 1000 years and continues to be an active temple. The temple has survived numerous invasions and natural disasters, standing as a testament to Chola engineering and architectural prowess.",
    architecture:
      "The temple is built entirely of granite and is a masterpiece of Dravidian architecture. The main temple tower (vimana) rises to a height of 216 feet (66 meters), making it one of the tallest temple towers in the world. The temple complex includes a massive Nandi (bull) statue carved from a single rock, weighing about 25 tons. The temple walls are adorned with exquisite sculptures and paintings depicting various forms of Shiva, Vishnu, and other deities. The temple's architectural features include a massive courtyard, pillared halls, and intricate stone carvings.",
    significance:
      "The Brihadeeswara Temple is considered the pinnacle of Chola architecture and represents the golden age of South Indian temple building. It demonstrates the advanced engineering skills of the Chola period, particularly in the construction of the massive dome without the use of mortar. The temple is also significant for its role in the development of Tamil literature, music, and dance. It houses numerous inscriptions that provide valuable historical information about the Chola period.",
    entryFee: "Free",
    bestTimeToVisit: "October to March. The annual Brahmotsavam festival is a special attraction.",
    photography: "Photography is allowed in the outer areas but restricted inside the sanctum.",
    howToReach:
      "Thanjavur is well-connected by road and rail. The nearest airport is Tiruchirappalli Airport (55 km). Regular buses and trains connect Thanjavur to major cities in Tamil Nadu.",
    nearbyAttractions: [
      "Thanjavur Palace and Art Gallery",
      "Saraswathi Mahal Library",
      "Gangaikonda Cholapuram (70 km)",
      "Darasuram Airavateswara Temple (45 km)",
    ],
    architecturalFeatures: [
      "216-foot tall vimana",
      "Granite construction",
      "Massive Nandi statue",
      "Dravidian architecture",
      "Intricate stone carvings",
      "Frescoes and paintings",
      "Pillared halls",
    ],
  },
]

/**
 * Get a monument by its ID
 */
export async function getMonumentById(id: string): Promise<Monument | null> {
  // Simulate database lookup
  const monument = monuments.find((m) => m.id === id)
  return monument || null
}

/**
 * Get all monuments
 */
export async function getAllMonuments(): Promise<Monument[]> {
  return monuments
}

/**
 * Search monuments by name or location
 */
export async function searchMonuments(query: string): Promise<Monument[]> {
  const lowerQuery = query.toLowerCase()
  return monuments.filter(
    (m) => m.name.toLowerCase().includes(lowerQuery) || m.location.toLowerCase().includes(lowerQuery),
  )
}
