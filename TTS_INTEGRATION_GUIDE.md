# 🎤 TTS Integration Guide - Main React Webpage

## ✅ **TTS is Now Integrated Everywhere!**

The gTTS Text-to-Speech feature has been successfully integrated into your main React webpage. Here's where you can find it:

## 🏠 **Main Page (Homepage)**

### **1. Hero Section**
- **Location**: Top of the page, main hero section
- **Features**: 
  - Language selector (English, Hindi, Kannada, Telugu, Tamil)
  - TTS button next to the language selector
  - Speaks the main description in the selected language
- **How to use**: 
  1. Select your preferred language from the dropdown
  2. Click the TTS button (speaker icon)
  3. Listen to the description in your chosen language

### **2. Popular Monuments Section**
- **Location**: "Popular Heritage Sites" section
- **Features**: 
  - TTS button on each monument card
  - Speaks monument name, description, and significance
- **How to use**: 
  1. Hover over any monument card
  2. Click the TTS button in the bottom-right corner
  3. Listen to monument information

### **3. Features Section**
- **Location**: "Discover Heritage with Advanced Technology" section
- **Features**: 
  - TTS button on each feature card
  - Speaks feature title and description
- **How to use**: 
  1. Hover over any feature card
  2. Click the TTS button in the center
  3. Listen to feature information

## 🏛️ **Monument Details Page**

### **4. Individual Monument Pages**
- **Location**: `/monument/[id]` pages (e.g., `/monument/taj-mahal`)
- **Features**: 
  - TTS button on each tab (Overview, History, Architecture, Visitor Info)
  - Speaks the content of each section
  - Uses the selected language from the language selector
- **How to use**: 
  1. Select your preferred language using the language selector
  2. Navigate to different tabs (Overview, History, etc.)
  3. Click the TTS button in the top-right of each tab
  4. Listen to detailed monument information

## 🎯 **How It Works**

### **Smart Language System**
- **For Indian Languages**: Automatically uses gTTS Flask backend (high quality)
- **For English**: Uses Web Speech API first (fast), then gTTS as backup
- **Translation**: Automatically translates content to the selected language

### **Backend Integration**
- **Flask Backend**: Running on port 5000 with gTTS
- **Supported Languages**: English, Hindi, Kannada, Telugu, Tamil, Marathi, Gujarati, Bengali, Punjabi, Odia
- **Audio Quality**: High-quality Google TTS technology

## 🚀 **Quick Test**

### **Test the Hero Section**
1. Go to your homepage: `http://localhost:3000`
2. Look for the language selector in the hero section
3. Select "Hindi" from the dropdown
4. Click the TTS button (speaker icon)
5. You should hear the description in Hindi!

### **Test Monument Information**
1. Go to any monument page: `http://localhost:3000/monument/taj-mahal`
2. Select "Kannada" from the language selector
3. Go to the "Overview" tab
4. Click the TTS button
5. You should hear the monument description in Kannada!

## 🔧 **Technical Details**

### **Component Usage**
```tsx
// Basic usage
<TextToSpeech text="Hello world" language="hi" />

// With translated content
<TextToSpeech 
  text={translatedText} 
  language={selectedLanguage} 
/>
```

### **Language Codes**
- `en` - English
- `hi` - Hindi
- `kn` - Kannada
- `te` - Telugu
- `ta` - Tamil
- `mr` - Marathi
- `gu` - Gujarati
- `bn` - Bengali
- `pa` - Punjabi
- `or` - Odia

## 🎉 **User Experience**

### **What Users Can Do**
1. **Multilingual Exploration**: Listen to content in their preferred language
2. **Accessibility**: Audio support for visually impaired users
3. **Learning**: Hear proper pronunciation of monument names and descriptions
4. **Convenience**: Hands-free information consumption

### **Perfect for**
- Tourists visiting India
- Students learning about Indian heritage
- Elderly users who prefer audio
- Users with visual impairments
- Anyone wanting to learn Indian languages

## 🚨 **Troubleshooting**

### **If TTS Doesn't Work**
1. **Check Backend**: Make sure Flask backend is running (`cd backend && python app.py`)
2. **Check Language**: Ensure the selected language is supported
3. **Check Browser**: Try a different browser if audio doesn't play
4. **Check Console**: Look for any error messages in browser console

### **Common Issues**
- **"Backend not running"**: Start the Flask backend
- **"Audio not playing"**: Check browser audio settings
- **"Language not supported"**: Try a different language

## 🎊 **You're All Set!**

Your main React webpage now has comprehensive TTS functionality integrated throughout. Users can:

- ✅ Listen to hero section descriptions in multiple languages
- ✅ Hear monument information on popular monuments cards
- ✅ Get audio guides for features and capabilities
- ✅ Listen to detailed monument information on individual pages
- ✅ Enjoy high-quality audio in 10+ Indian languages

The TTS system is now a core feature of your heritage guide application! 🚀
