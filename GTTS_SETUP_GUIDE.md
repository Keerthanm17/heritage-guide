# gTTS Flask Backend Setup Guide

## Overview

This project now includes a **gTTS (Google Text-to-Speech) Flask Backend** that provides excellent TTS capabilities for Indian languages. This approach offers:

- ✅ **High-quality audio** - Google's TTS technology
- ✅ **Excellent Indian language support** - Native support for 10+ Indian languages
- ✅ **No API keys required** - Completely free to use
- ✅ **Real-time translation integration** - Works with existing Gemini translation
- ✅ **Flask backend** - Easy to deploy and maintain

## Architecture

```
Frontend (Next.js) → Flask Backend (gTTS) → Google TTS API → Audio Response
```

## Quick Start

### 1. Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Run the setup script
python setup.py

# Or install manually
pip install -r requirements.txt
```

### 2. Start the Flask Backend

```bash
# In the backend directory
python app.py
```

You should see:
```
Starting gTTS Flask Backend...
Supported languages: ['en', 'hi', 'kn', 'te', 'ta', 'mr', 'gu', 'bn', 'pa', 'or']
 * Running on http://0.0.0.0:5000
```

### 3. Start the Frontend

```bash
# In the main project directory
npm run dev
```

### 4. Test the System

Visit `http://localhost:3000/test-gtts` to test the gTTS system.

## Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Full Support |
| Hindi | `hi` | ✅ Full Support |
| Kannada | `kn` | ✅ Full Support |
| Telugu | `te` | ✅ Full Support |
| Tamil | `ta` | ✅ Full Support |
| Marathi | `mr` | ✅ Full Support |
| Gujarati | `gu` | ✅ Full Support |
| Bengali | `bn` | ✅ Full Support |
| Punjabi | `pa` | ✅ Full Support |
| Odia | `or` | ✅ Full Support |

## Backend API Endpoints

### POST `/tts`
Generate TTS audio for given text and language.

**Request:**
```json
{
  "text": "Hello, this is a test",
  "language": "en"
}
```

**Response:** Audio file (MP3)

### GET `/health`
Check backend health status.

**Response:**
```json
{
  "status": "healthy",
  "service": "gTTS Flask Backend"
}
```

### GET `/languages`
Get list of supported languages.

**Response:**
```json
{
  "languages": {
    "en": "en",
    "hi": "hi",
    "kn": "kn",
    "te": "te",
    "ta": "ta",
    "mr": "mr",
    "gu": "gu",
    "bn": "bn",
    "pa": "pa",
    "or": "or"
  },
  "supported_languages": ["en", "hi", "kn", "te", "ta", "mr", "gu", "bn", "pa", "or"]
}
```

## Frontend Integration

### Using the gTTS Component

```tsx
import { GTTSTextToSpeech } from "@/components/gtts-text-to-speech"

<GTTSTextToSpeech 
  text="Welcome to the Indian Heritage Guide" 
  language="hi"
  backendUrl="http://localhost:5000"
/>
```

### Component Props

- `text`: Text to convert to speech
- `language`: Language code (en, hi, kn, te, ta, etc.)
- `backendUrl`: Flask backend URL (default: http://localhost:5000)

## Features

### 1. High-Quality Audio
- Google's TTS technology
- MP3 format output
- Natural-sounding voices

### 2. Indian Language Support
- Native support for 10+ Indian languages
- Proper pronunciation and intonation
- No fallback to English voices

### 3. Translation Integration
- Works with existing Gemini translation system
- Automatic text translation before TTS
- Seamless multilingual experience

### 4. Real-time Processing
- Fast audio generation
- Streaming audio playback
- Minimal latency

### 5. Error Handling
- Comprehensive error messages
- Graceful fallbacks
- Backend health monitoring

## Testing

### Manual Testing
1. Navigate to `/test-gtts`
2. Check backend status
3. Select different languages
4. Enter custom text
5. Test playback controls

### Automated Testing
```bash
# Test backend health
curl http://localhost:5000/health

# Test TTS generation
curl -X POST http://localhost:5000/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","language":"en"}' \
  --output test.mp3
```

## Troubleshooting

### Common Issues

#### 1. "Backend Disconnected"
**Cause:** Flask backend is not running
**Solution:**
```bash
cd backend
python app.py
```

#### 2. "Module not found: gTTS"
**Cause:** Dependencies not installed
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

#### 3. "CORS Error"
**Cause:** Frontend can't connect to backend
**Solution:** Ensure Flask-CORS is installed and backend is running

#### 4. "Audio playback failed"
**Cause:** Browser audio issues
**Solution:**
- Check browser audio settings
- Try different browser
- Check console for errors

### Debug Steps

1. **Check Backend Status**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Test TTS Directly**
   ```bash
   curl -X POST http://localhost:5000/tts \
     -H "Content-Type: application/json" \
     -d '{"text":"Test","language":"en"}' \
     --output test.mp3
   ```

3. **Check Console Logs**
   - Backend logs in terminal
   - Frontend logs in browser console

4. **Verify Network**
   - Check if port 5000 is available
   - Ensure no firewall blocking

## Performance Considerations

### 1. Audio Generation
- gTTS generates audio on-demand
- First request may be slower
- Subsequent requests are faster

### 2. File Management
- Temporary files are auto-cleaned
- No persistent storage required
- Minimal disk usage

### 3. Network Usage
- Audio files are streamed
- No large file downloads
- Efficient bandwidth usage

## Deployment

### Local Development
```bash
# Backend
cd backend && python app.py

# Frontend
npm run dev
```

### Production Deployment
1. Deploy Flask backend to your server
2. Update frontend backend URL
3. Configure CORS for production domain
4. Set up proper error handling

## Comparison with Previous Systems

| Feature | Web Speech API | Voice RSS | gTTS Flask |
|---------|---------------|-----------|------------|
| **Quality** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Indian Languages** | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Setup Complexity** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Cost** | Free | API Limits | Free |
| **Reliability** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Future Enhancements

### Planned Features
- Audio caching system
- Voice selection options
- Speech rate control
- Batch processing
- Offline support

### Potential Integrations
- Amazon Polly
- Microsoft Azure Speech
- Google Cloud TTS
- Local TTS engines

## Support

For issues with gTTS integration:
1. Check the test page at `/test-gtts`
2. Review backend logs
3. Verify network connectivity
4. Test with simple text first
5. Check browser console for errors

## License

gTTS is free to use and subject to Google's terms of service. This integration is for educational and development purposes.
