import fs from "fs"
import { execSync } from "child_process"

// Create Python script for converting the model to TensorFlow.js format
const pythonScript = `
import os
import json
import tensorflow as tf
import tensorflowjs as tfjs

# Configuration
MODEL_PATH = 'monument_classifier.h5'
TFJS_MODEL_DIR = 'public/models/monument_classifier'

# Create output directory
os.makedirs(TFJS_MODEL_DIR, exist_ok=True)

# Load the model
model = tf.keras.models.load_model(MODEL_PATH)

# Convert the model to TensorFlow.js format
tfjs.converters.save_keras_model(model, TFJS_MODEL_DIR)
print(f"Model converted and saved to {TFJS_MODEL_DIR}")

# Load and convert the class mapping
with open('monument_classes.txt', 'r') as f:
    lines = f.readlines()

class_mapping = {}
for line in lines:
    parts = line.strip().split(': ', 1)
    if len(parts) == 2:
        class_idx, monument_name = parts
        # Get the monument ID from the mapping
        with open('monument_mapping.json', 'r') as mapping_file:
            monument_mapping = json.load(mapping_file)
            
        # Find the monument ID for this name
        monument_id = None
        for info in monument_mapping.values():
            if info['name'] == monument_name:
                monument_id = info['id']
                break
        
        if monument_id:
            class_mapping[class_idx] = monument_id
        else:
            # Fallback to a sanitized version of the name
            class_mapping[class_idx] = monument_name.replace(' ', '_').lower()

# Save the class mapping as JSON
with open(os.path.join(TFJS_MODEL_DIR, 'classes.json'), 'w') as f:
    json.dump(class_mapping, f, indent=2)

print(f"Class mapping saved to {os.path.join(TFJS_MODEL_DIR, 'classes.json')}")

# Copy the monument data to the lib directory
with open('monument_data.json', 'r') as f:
    monument_data = json.load(f)

# Save to lib directory
os.makedirs('lib', exist_ok=True)
with open('lib/monument-data.json', 'w') as f:
    json.dump(monument_data, f, indent=2)

print(f"Monument data copied to lib/monument-data.json")
`

// Write the Python script to a file
fs.writeFileSync("setup_model_for_web.py", pythonScript)

// Install required packages
try {
  execSync("pip show tensorflowjs", { stdio: "ignore" })
  console.log("TensorFlow.js converter is already installed")
} catch (error) {
  console.log("Installing TensorFlow.js converter...")
  execSync("pip install tensorflowjs")
}

// Execute the Python script
console.log("Setting up model for web use...")
try {
  execSync("python setup_model_for_web.py", { stdio: "inherit" })
  console.log("Model setup completed successfully!")
} catch (error) {
  console.error("Error during model setup:", error.message)
}

// Update package.json to include TensorFlow.js
console.log("Adding TensorFlow.js to package.json...")
try {
  execSync("npm install @tensorflow/tfjs --save")
  console.log("TensorFlow.js added to dependencies")
} catch (error) {
  console.error("Error adding TensorFlow.js:", error.message)
}
