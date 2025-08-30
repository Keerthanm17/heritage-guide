import fs from "fs"
import { execSync } from "child_process"

// Create Python script for generating monument data
const pythonScript = `
import json
import requests
from bs4 import BeautifulSoup
import time
import random

# Load the monument mapping
with open('monument_mapping.json', 'r') as f:
    monument_mapping = json.load(f)

# Define the structure for monument data
monument_data = {}

# Function to fetch Wikipedia data for a monument
def fetch_monument_info(monument_name):
    print(f"Fetching data for: {monument_name}")
    
    # Replace spaces with underscores for Wikipedia URL
    wiki_query = monument_name.replace(" ", "_")
    
    # Try to fetch from Wikipedia
    try:
        # Make the request
        url = f"https://en.wikipedia.org/wiki/{wiki_query}"
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract basic info
            title = soup.find('h1', {'id': 'firstHeading'}).text
            
            # Get the first few paragraphs for description
            paragraphs = soup.find_all('p')
            description = ""
            for p in paragraphs[:3]:  # Take first 3 paragraphs
                if p.text.strip():
                    description += p.text.strip() + " "
            
            # Try to extract location
            location = "India"  # Default
            infobox = soup.find('table', {'class': 'infobox'})
            if infobox:
                rows = infobox.find_all('tr')
                for row in rows:
                    header = row.find('th')
                    if header and ('Location' in header.text or 'Place' in header.text):
                        location_cell = row.find('td')
                        if location_cell:
                            location = location_cell.text.strip()
            
            # Try to extract year built
            year_built = None
            if infobox:
                for row in rows:
                    header = row.find('th')
                    if header and ('Built' in header.text or 'Construction' in header.text or 'Date' in header.text):
                        year_cell = row.find('td')
                        if year_cell:
                            year_built = year_cell.text.strip()
            
            # Generate tags based on the content
            tags = []
            if "UNESCO" in description or "World Heritage" in description:
                tags.append("UNESCO World Heritage")
            
            if "temple" in monument_name.lower() or "temple" in description.lower():
                tags.append("Temple")
            elif "fort" in monument_name.lower() or "fort" in description.lower():
                tags.append("Fort")
            elif "palace" in monument_name.lower() or "palace" in description.lower():
                tags.append("Palace")
            elif "tomb" in monument_name.lower() or "tomb" in description.lower() or "mausoleum" in monument_name.lower():
                tags.append("Tomb")
            
            # Add architectural style if mentioned
            if "Gothic" in description:
                tags.append("Gothic Architecture")
            elif "Mughal" in description:
                tags.append("Mughal Architecture")
            elif "Dravidian" in description:
                tags.append("Dravidian Architecture")
            elif "Indo-Islamic" in description or "Indo Islamic" in description:
                tags.append("Indo-Islamic Architecture")
            
            # Extract architectural details if available
            architecture = None
            if infobox:
                for row in rows:
                    header = row.find('th')
                    if header and ('Architectural style' in header.text or 'Style' in header.text or 'Architecture' in header.text):
                        arch_cell = row.find('td')
                        if arch_cell:
                            architecture = arch_cell.text.strip()
            
            # Create a structured data object
            monument_info = {
                "name": title,
                "description": description.strip(),
                "location": location,
                "yearBuilt": year_built,
                "visitingHours": "9:00 AM - 5:00 PM",  # Default
                "tags": tags,
                "architecture": architecture,
                "imageUrl": f"/images/{monument_name.replace(' ', '_').lower()}.jpg"
            }
            
            return monument_info
            
        else:
            print(f"Failed to fetch data for {monument_name}: HTTP {response.status_code}")
            return None
            
    except Exception as e:
        print(f"Error fetching data for {monument_name}: {str(e)}")
        return None

# Process each monument
for idx, info in monument_mapping.items():
    monument_name = info['name']
    monument_id = info['id']
    
    # Fetch data from Wikipedia
    monument_info = fetch_monument_info(monument_name)
    
    if monument_info:
        # Add to our data structure
        monument_data[monument_id] = {
            "id": monument_id,
            "class_index": info['class_index'],
            **monument_info
        }
    
    # Be nice to Wikipedia - add a small delay between requests
    time.sleep(random.uniform(1, 3))

# Save the monument data to a JSON file
with open('monument_data.json', 'w') as f:
    json.dump(monument_data, f, indent=4)

print(f"Monument data saved to monument_data.json")
print(f"Total monuments with data: {len(monument_data)}")
`

// Write the Python script to a file
fs.writeFileSync("generate_monument_data.py", pythonScript)

// Install required packages
try {
  execSync("pip show requests beautifulsoup4", { stdio: "ignore" })
  console.log("Required packages are already installed")
} catch (error) {
  console.log("Installing required packages...")
  execSync("pip install requests beautifulsoup4")
}

// Execute the Python script
console.log("Starting monument data generation...")
try {
  execSync("python generate_monument_data.py", { stdio: "inherit" })
  console.log("Monument data generation completed successfully!")
} catch (error) {
  console.error("Error during monument data generation:", error.message)
}
