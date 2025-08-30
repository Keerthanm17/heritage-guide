"""
ENHANCED MONUMENT RECOGNITION MODEL TRAINING
============================================

This script creates a comprehensive training pipeline for monument recognition
using a larger dataset and proper computer vision techniques.

DATASET REQUIREMENTS:
- Minimum 100 images per monument class
- Total dataset: 3,700+ images (37 monuments × 100 images)
- Image resolution: 800x800 minimum
- Diverse angles, lighting conditions, and seasons

MODEL ARCHITECTURE:
- Base: ResNet50 pre-trained on ImageNet
- Custom classification head for 37 monument classes
- Input size: 224x224x3
- Output: 37 classes with softmax activation

TRAINING SPECIFICATIONS:
- Data augmentation: rotation, zoom, brightness, contrast
- Train/Validation split: 80/20
- Batch size: 32
- Epochs: 50 with early stopping
- Optimizer: Adam with learning rate scheduling
"""

import os
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Configuration
CONFIG = {
    'dataset_dir': 'enhanced_monument_dataset',
    'model_output': 'monument_classifier_v2.h5',
    'tfjs_output': 'public/models/monument_classifier',
    'img_size': 224,
    'batch_size': 32,
    'epochs': 50,
    'num_classes': 28,
    'min_images_per_class': 100,
    'validation_split': 0.2
}

# Enhanced monument list with specific search terms for better data collection
MONUMENTS_ENHANCED = {
    'taj_mahal': {
        'name': 'Taj Mahal',
        'search_terms': ['Taj Mahal Agra', 'Taj Mahal India', 'Taj Mahal architecture', 'Taj Mahal different angles'],
        'location': 'Agra, Uttar Pradesh'
    },
    'red_fort': {
        'name': 'Red Fort',
        'search_terms': ['Red Fort Delhi', 'Lal Qila', 'Red Fort architecture', 'Red Fort walls'],
        'location': 'Delhi'
    },
    'golden_temple': {
        'name': 'Golden Temple',
        'search_terms': ['Golden Temple Amritsar', 'Harmandir Sahib', 'Golden Temple night', 'Golden Temple reflection'],
        'location': 'Amritsar, Punjab'
    },
    'mysore_palace': {
        'name': 'Mysore Palace',
        'search_terms': ['Mysore Palace Karnataka', 'Mysore Palace illuminated', 'Mysore Palace architecture', 'Amba Vilas Palace'],
        'location': 'Mysore, Karnataka'
    },
    'hampi_virupaksha': {
        'name': 'Virupaksha Temple Hampi',
        'search_terms': ['Virupaksha Temple Hampi', 'Hampi temple', 'Virupaksha gopuram', 'Hampi Vijayanagara'],
        'location': 'Hampi, Karnataka'
    },
    'stone_chariot_hampi': {
        'name': 'Stone Chariot Hampi',
        'search_terms': ['Stone Chariot Hampi', 'Vittala Temple chariot', 'Hampi stone chariot', 'Hampi chariot wheels'],
        'location': 'Hampi, Karnataka'
    },
    'qutub_minar': {
        'name': 'Qutub Minar',
        'search_terms': ['Qutub Minar Delhi', 'Qutub Minar tower', 'Qutub complex', 'Qutub Minar architecture'],
        'location': 'Delhi'
    },
    'gateway_of_india': {
        'name': 'Gateway of India',
        'search_terms': ['Gateway of India Mumbai', 'Gateway of India arch', 'Gateway of India sea', 'Mumbai gateway'],
        'location': 'Mumbai, Maharashtra'
    },
    'hawa_mahal': {
        'name': 'Hawa Mahal',
        'search_terms': ['Hawa Mahal Jaipur', 'Palace of Winds', 'Hawa Mahal pink', 'Jaipur Hawa Mahal'],
        'location': 'Jaipur, Rajasthan'
    },
    'lotus_temple': {
        'name': 'Lotus Temple',
        'search_terms': ['Lotus Temple Delhi', 'Bahai Temple', 'Lotus Temple architecture', 'Delhi Lotus Temple'],
        'location': 'Delhi'
    },
    
}
# Add all 37 monuments with enhanced search terms...
def create_enhanced_dataset():
    """
    Create an enhanced dataset with more images per monument
    """
    print("Creating enhanced monument dataset...")
    
    # Create base directory
    os.makedirs(CONFIG['dataset_dir'], exist_ok=True)
    
    for monument_id, monument_info in MONUMENTS_ENHANCED.items():
        print(f"Collecting images for: {monument_info['name']}")
        
        monument_dir = os.path.join(CONFIG['dataset_dir'], monument_id)
        os.makedirs(monument_dir, exist_ok=True)
        
        # Use multiple search terms for better diversity
        for search_term in monument_info['search_terms']:
            print(f"  Searching: {search_term}")
            
            # Here you would implement image collection
            # Using APIs like Google Images, Bing, or Flickr
            # This is a placeholder for the actual implementation
            collect_images_for_term(search_term, monument_dir, 25)  # 25 images per search term
    
    print(f"Dataset creation completed. Target: {CONFIG['min_images_per_class']} images per class")

def collect_images_for_term(search_term, output_dir, num_images):
    """
    Collect images for a specific search term
    This would use actual image APIs in production
    """
    # Placeholder implementation
    # In real implementation, you would use:
    # - Google Custom Search API
    # - Bing Image Search API
    # - Flickr API
    # - Web scraping with proper permissions
    pass

def create_model():
    """
    Create the monument recognition model
    """
    print("Creating model architecture...")
    
    # Load pre-trained ResNet50
    base_model = ResNet50(
        weights='imagenet',
        include_top=False,
        input_shape=(CONFIG['img_size'], CONFIG['img_size'], 3)
    )
    
    # Freeze base model layers initially
    base_model.trainable = False
    
    # Create custom classification head
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(CONFIG['num_classes'], activation='softmax')
    ])
    
    return model

def create_data_generators():
    """
    Create data generators with augmentation
    """
    # Training data augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        brightness_range=[0.8, 1.2],
        fill_mode='nearest',
        validation_split=CONFIG['validation_split']
    )
    
    # Validation data (no augmentation)
    val_datagen = ImageDataGenerator(
        rescale=1./255,
        validation_split=CONFIG['validation_split']
    )
    
    # Create generators
    train_generator = train_datagen.flow_from_directory(
        CONFIG['dataset_dir'],
        target_size=(CONFIG['img_size'], CONFIG['img_size']),
        batch_size=CONFIG['batch_size'],
        class_mode='categorical',
        subset='training',
        shuffle=True
    )
    
    validation_generator = val_datagen.flow_from_directory(
        CONFIG['dataset_dir'],
        target_size=(CONFIG['img_size'], CONFIG['img_size']),
        batch_size=CONFIG['batch_size'],
        class_mode='categorical',
        subset='validation',
        shuffle=False
    )
    
    return train_generator, validation_generator

def train_model():
    """
    Train the monument recognition model
    """
    print("Starting model training...")
    
    # Create model
    model = create_model()
    
    # Compile model
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'top_3_accuracy']
    )
    
    # Create data generators
    train_gen, val_gen = create_data_generators()
    
    # Callbacks
    callbacks = [
        keras.callbacks.ModelCheckpoint(
            CONFIG['model_output'],
            monitor='val_accuracy',
            save_best_only=True,
            mode='max',
            verbose=1
        ),
        keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True,
            verbose=1
        ),
        keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=5,
            min_lr=1e-7,
            verbose=1
        ),
        keras.callbacks.CSVLogger('training_log.csv')
    ]
    
    # Train model
    history = model.fit(
        train_gen,
        epochs=CONFIG['epochs'],
        validation_data=val_gen,
        callbacks=callbacks,
        verbose=1
    )
    
    # Fine-tuning phase
    print("Starting fine-tuning...")
    model.layers[0].trainable = True  # Unfreeze base model
    
    # Lower learning rate for fine-tuning
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'top_3_accuracy']
    )
    
    # Continue training
    history_fine = model.fit(
        train_gen,
        epochs=20,
        validation_data=val_gen,
        callbacks=callbacks,
        verbose=1
    )
    
    return model, history

def convert_to_tensorflowjs(model):
    """
    Convert trained model to TensorFlow.js format
    """
    print("Converting model to TensorFlow.js format...")
    
    import tensorflowjs as tfjs
    
    # Create output directory
    os.makedirs(CONFIG['tfjs_output'], exist_ok=True)
    
    # Convert model
    tfjs.converters.save_keras_model(model, CONFIG['tfjs_output'])
    
    # Save class mapping
    train_gen, _ = create_data_generators()
    class_indices = train_gen.class_indices
    
    # Invert the mapping
    classes = {v: k for k, v in class_indices.items()}
    
    with open(os.path.join(CONFIG['tfjs_output'], 'classes.json'), 'w') as f:
        json.dump(classes, f, indent=2)
    
    print(f"Model converted and saved to: {CONFIG['tfjs_output']}")
    print("Files created:")
    print("- model.json (model architecture)")
    print("- *.bin files (model weights)")
    print("- classes.json (class mapping)")

def evaluate_model(model):
    """
    Evaluate model performance
    """
    print("Evaluating model...")
    
    _, val_gen = create_data_generators()
    
    # Evaluate on validation set
    results = model.evaluate(val_gen, verbose=1)
    
    print(f"Validation Accuracy: {results[1]:.4f}")
    print(f"Validation Top-3 Accuracy: {results[2]:.4f}")
    
    return results

def main():
    """
    Main training pipeline
    """
    print("ENHANCED MONUMENT RECOGNITION MODEL TRAINING")
    print("=" * 50)
    print(f"Target monuments: {CONFIG['num_classes']}")
    print(f"Images per monument: {CONFIG['min_images_per_class']}+")
    print(f"Total dataset size: {CONFIG['num_classes'] * CONFIG['min_images_per_class']}+ images")
    print(f"Model output: {CONFIG['model_output']}")
    print(f"TensorFlow.js output: {CONFIG['tfjs_output']}")
    print()
    
    # Step 1: Create enhanced dataset
    create_enhanced_dataset()
    
    # Step 2: Train model
    model, history = train_model()
    
    # Step 3: Evaluate model
    evaluate_model(model)
    
    # Step 4: Convert to TensorFlow.js
    convert_to_tensorflowjs(model)
    
    print("\nTraining completed successfully!")
    print(f"Model saved as: {CONFIG['model_output']}")
    print(f"TensorFlow.js model saved to: {CONFIG['tfjs_output']}")

if __name__ == "__main__":
    main()
