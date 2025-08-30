import fs from "fs"
import { execSync } from "child_process"

// Install required packages if not already installed
try {
  execSync("pip show tensorflow keras matplotlib scikit-learn", { stdio: "ignore" })
  console.log("Required packages are already installed")
} catch (error) {
  console.log("Installing required packages...")
  execSync("pip install tensorflow keras matplotlib scikit-learn pillow")
}

// Create Python script for model training
const pythonScript = `
import os
import json
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2, ResNet50
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau

# Configuration
DATASET_DIR = 'monument_dataset'
IMG_SIZE = 224  # ResNet50 input size
BATCH_SIZE = 32
EPOCHS = 20
MODEL_PATH = 'monument_classifier.h5'

# Load monument mapping
with open('monument_mapping.json', 'r') as f:
    monument_mapping = json.load(f)

num_classes = len(monument_mapping)
print(f"Training model for {num_classes} monument classes")

# Data augmentation for training
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2  # 20% for validation
)

# Only rescaling for validation
val_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

# Load training data
train_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

# Load validation data
validation_generator = val_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Get class indices and update our mapping
class_indices = train_generator.class_indices
class_indices_inv = {v: k for k, v in class_indices.items()}

# Update the mapping file with directory to class index mapping
for idx, info in monument_mapping.items():
    dir_name = info['id']
    if dir_name in class_indices:
        info['train_class_index'] = class_indices[dir_name]

# Save updated mapping
with open('monument_mapping.json', 'w') as f:
    json.dump(monument_mapping, f, indent=4)

# Create a text file with class indices
with open('monument_classes.txt', 'w') as f:
    for class_idx, dir_name in class_indices_inv.items():
        # Find the original monument name from our mapping
        monument_name = None
        for info in monument_mapping.values():
            if info['id'] == dir_name:
                monument_name = info['name']
                break
        
        if monument_name:
            f.write(f"{class_idx}: {monument_name}\\n")
        else:
            f.write(f"{class_idx}: {dir_name}\\n")

# Create the model using transfer learning with ResNet50
base_model = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)

# Freeze the base model layers
for layer in base_model.layers:
    layer.trainable = False

# Create the model architecture
model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(1024, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(512, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(num_classes, activation='softmax')
])

# Compile the model
model.compile(
    optimizer=keras.optimizers.Adam(1e-4),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Model summary
model.summary()

# Callbacks for training
callbacks = [
    ModelCheckpoint(
        MODEL_PATH,
        monitor='val_accuracy',
        save_best_only=True,
        mode='max',
        verbose=1
    ),
    EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.2,
        patience=3,
        min_lr=1e-6,
        verbose=1
    )
]

# Train the model
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=validation_generator,
    callbacks=callbacks
)

# Plot training history
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='upper left')

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='upper left')

plt.tight_layout()
plt.savefig('training_history.png')

# Save the model architecture as JSON
model_json = model.to_json()
with open("monument_model_architecture.json", "w") as json_file:
    json_file.write(model_json)

print("Training completed!")
print(f"Model saved to {MODEL_PATH}")
print("Class mapping saved to monument_classes.txt")
print("Training history plot saved to training_history.png")
`

// Write the Python script to a file
fs.writeFileSync("train_monument_model.py", pythonScript)

// Execute the Python script
console.log("Starting model training...")
try {
  execSync("python train_monument_model.py", { stdio: "inherit" })
  console.log("Model training completed successfully!")
} catch (error) {
  console.error("Error during model training:", error.message)
}
