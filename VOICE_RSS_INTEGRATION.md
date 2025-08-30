# Voice RSS Text-to-Speech Integration

## Overview

This project now includes Voice RSS Text-to-Speech API integration as a high-quality alternative to the Web Speech API. Voice RSS provides excellent TTS capabilities for Indian languages with natural-sounding voices.

## Features

- **High-quality audio output** (MP3 format, 44kHz stereo)
- **Multiple language support** (English, Hindi, Kannada, Telugu, Tamil)
- **Natural-sounding voices** for Indian languages
- **Automatic fallback system** (Web Speech API → Voice RSS → Alternative)
- **Real-time translation integration** with Gemini API
- **Volume and playback controls**

## API Configuration

### Voice RSS API Details
- **API URL**: `https://api.voicerss.org/`
- **API Key**: `dc6fceed3cfc4ab4bd9ccb76af1a52ca`
- **Audio Format**: MP3
- **Quality**: 44kHz 16-bit stereo
- **Base64 Encoding**: Enabled for direct audio playback

### Language Mapping
```typescript
const VOICE_RSS_LANGUAGE_MAPPING = {
  "en": "en-us",
  "hi": "hi-in", // Hindi
  "kn": "kn-in", // Kannada
  "te": "te-in", // Telugu
  "ta": "ta-in", // Tamil
}
```

### Voice Mapping
```typescript
const VOICE_RSS_VOICE_MAPPING = {
  "en": "Linda", // English female voice
  "hi": "Priya", // Hindi female voice
  "kn": "Kavya", // Kannada female voice
  "te": "Teja",  // Telugu female voice
  "ta": "Tara",  // Tamil female voice
}
```

## Implementation

### Backend API Route
**File**: `app/api/tts-voicerss/route.ts`

The API route handles:
- Text and language validation
- Voice RSS API requests
- Base64 audio response processing
- Error handling and fallback

### Frontend Integration
**File**: `components/text-to-speech.tsx`

The TTS component includes:
- Voice RSS as secondary TTS method
- Automatic fallback from Web Speech API
- Audio playback with HTML5 Audio API
- Volume and mute controls

## Usage

### Basic Usage
```tsx
import { TextToSpeech } from "@/components/text-to-speech"

<TextToSpeech text="Hello, this is a test" language="en" />
```

### With Translation
```tsx
<TextToSpeech 
  text="Welcome to the Indian Heritage Guide" 
  language="hi" 
/>
```

### Test Page
Visit `/test-voicerss` to test the Voice RSS integration with:
- Multiple language samples
- Custom text input
- Real-time testing
- Performance monitoring

## TTS Pipeline

1. **Web Speech API** (Primary)
   - Built into browsers
   - No network delay
   - Limited Indian language support

2. **Voice RSS API** (Secondary)
   - High-quality audio
   - Excellent Indian language support
   - Network request required

3. **Alternative TTS** (Fallback)
   - Future implementations
   - Additional free services

## Error Handling

The system gracefully handles:
- API key issues
- Network failures
- Unsupported languages
- Audio playback errors
- Translation failures

## Performance Considerations

### Caching
- Consider caching translated text
- Implement audio caching for repeated phrases
- Use service worker for offline support

### Rate Limiting
- Voice RSS has usage limits
- Implement request throttling
- Monitor API usage

### Audio Quality
- MP3 format for compatibility
- 44kHz stereo for high quality
- Base64 encoding for direct playback

## Testing

### Manual Testing
1. Navigate to `/test-voicerss`
2. Select different languages
3. Enter custom text
4. Test playback controls
5. Check console for logs

### Automated Testing
```typescript
// Test Voice RSS API directly
const response = await fetch('/api/tts-voicerss', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Test', language: 'en' })
})
```

## Troubleshooting

### Common Issues

#### "Voice RSS API error"
- Check API key validity
- Verify network connectivity
- Check API usage limits

#### "Audio playback failed"
- Check browser audio support
- Verify base64 decoding
- Check audio format compatibility

#### "Translation failed"
- Verify Gemini API key
- Check network connectivity
- Validate language codes

### Debug Steps
1. Check browser console for errors
2. Verify API responses in Network tab
3. Test with simple English text first
4. Check audio element creation
5. Validate base64 audio data

## Future Enhancements

### Planned Features
- Audio caching system
- Voice selection options
- Speech rate control
- Pitch adjustment
- Offline support

### Potential Integrations
- ResponsiveVoice.js
- Amazon Polly
- Google Cloud TTS
- Microsoft Azure Speech

## Security Considerations

### API Key Management
- Store API keys securely
- Use environment variables
- Implement key rotation
- Monitor usage patterns

### Data Privacy
- No text storage
- Secure API communication
- HTTPS enforcement
- User consent for audio

## Support

For issues with Voice RSS integration:
1. Check the test page at `/test-voicerss`
2. Review console logs
3. Verify API configuration
4. Test with different browsers
5. Contact development team

## License

Voice RSS API usage is subject to their terms of service. This integration is for educational and development purposes.
