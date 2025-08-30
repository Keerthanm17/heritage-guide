import fs from "fs"
import { execSync } from "child_process"

// Install icrawler if not already installed
try {
  execSync("pip show icrawler", { stdio: "ignore" })
  console.log("icrawler is already installed")
} catch (error) {
  console.log("Installing icrawler...")
  execSync("pip install icrawler")
}

// Create Python script for image crawling
const pythonScript = `
import os
import json
from icrawler.builtin import GoogleImageCrawler

# List of Indian monuments to crawl (with focus on Karnataka)
monuments = [
    # Karnataka Monuments
    "Mysore Palace Karnataka",
    "Hampi Virupaksha Temple Karnataka",
    "Gol Gumbaz Bijapur Karnataka",
    "Chennakesava Temple Belur Karnataka",
    "Hoysaleswara Temple Halebidu Karnataka",
    "Badami Cave Temples Karnataka",
    "Pattadakal Temples Karnataka",
    "Aihole Temples Karnataka",
    "Gomateshwara Statue Shravanabelagola Karnataka",
    "Keshava Temple Somanathapura Karnataka",
    "Durga Temple Aihole Karnataka",
    "Chitradurga Fort Karnataka",
    "Bidar Fort Karnataka",
    
    # Other Famous Indian Monuments
    "Taj Mahal Agra",
    "Red Fort Delhi",
    "Qutub Minar Delhi",
    "India Gate Delhi",
    "Hawa Mahal Jaipur",
    "Gateway of India Mumbai",
    "Khajuraho Temples",
    "Konark Sun Temple",
    "Ajanta Caves",
    "Ellora Caves",
    "Meenakshi Temple Madurai",
    "Brihadeeswara Temple Thanjavur",
    "Golden Temple Amritsar",
    "Sanchi Stupa",
    "Charminar Hyderabad",
    "Victoria Memorial Kolkata"
]

# Create base directory for dataset
base_dir = 'monument_dataset'
os.makedirs(base_dir, exist_ok=True)

# Create a mapping file
monument_mapping = {}

# Crawl images for each monument
for idx, monument in enumerate(monuments):
    print(f"Crawling images for: {monument}")
    
    # Create a clean directory name
    dir_name = monument.replace(" ", "_").lower()
    dir_path = os.path.join(base_dir, dir_name)
    os.makedirs(dir_path, exist_ok=True)
    
    # Store mapping
    monument_mapping[idx] = {
        'id': dir_name,
        'name': monument,
        'class_index': idx
    }
    
    # Configure and run the crawler
    google_crawler = GoogleImageCrawler(
        storage={'root_dir': dir_path},
        feeder_threads=1,
        parser_threads=2,
        downloader_threads=4,
        downloader_kwargs={'min_size': (800, 800)}  # Minimum resolution
    )
    
    # Search for high-quality images
    google_crawler.crawl(
        keyword=monument + ' high resolution',
        max_num=100,  # Collect 100 images per monument
        filters={'size': 'large'}  # Focus on large images
    )

# Save the mapping to a JSON file
with open('monument_mapping.json', 'w') as f:
    json.dump(monument_mapping, f, indent=4)

# Also create a simple text mapping file
with open('monument_classes.txt', 'w') as f:
    for idx, info in monument_mapping.items():
        f.write(f"{idx}: {info['name']}\\n")

print("Image crawling completed!")
print(f"Total monuments: {len(monuments)}")
print(f"Mapping saved to monument_mapping.json and monument_classes.txt")
`

// Write the Python script to a file
fs.writeFileSync("crawl_monument_images.py", pythonScript)

// Execute the Python script
console.log("Starting image crawler...")
try {
  execSync("python crawl_monument_images.py", { stdio: "inherit" })
  console.log("Image crawling completed successfully!")
} catch (error) {
  console.error("Error during image crawling:", error.message)
}
