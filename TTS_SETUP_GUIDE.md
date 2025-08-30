# Free TTS Setup Guide for Indian Languages

## Overview

This project now uses a **multi-tier TTS solution** with the following architecture:

1. **Primary**: Web Speech API (built into browsers)
2. **Secondary**: Voice RSS API (high-quality TTS service)
3. **Fallback**: Alternative free TTS services (configurable)
4. **Translation**: Gemini API for text translation

## How It Works

### 1. Translation Pipeline
```
English Text → Gemini API → Translated Text → TTS → Audio Output
```

### 2. TTS Pipeline
```
Web Speech API (Primary) → Voice RSS API (Secondary) → Alternative TTS (Fallback) → Error Handling
```

## Supported Languages

| Language | Code | Web Speech API | Notes |
|----------|------|----------------|-------|
| English | `en` | ✅ Full Support | Native browser support |
| Hindi | `hi` | ⚠️ Limited | May fall back to English voice |
| Kannada | `kn` | ⚠️ Limited | May fall back to English voice |
| Telugu | `te` | ⚠️ Limited | May fall back to English voice |
| Tamil | `ta` | ⚠️ Limited | May fall back to English voice |

## Browser Compatibility

### ✅ Supported Browsers
- **Chrome/Edge**: Full support for Web Speech API
- **Firefox**: Good support, may have limited voices
- **Safari**: Limited support, fewer voices available

### ⚠️ Limitations
- **Indian Language Voices**: Limited availability in most browsers
- **Voice Quality**: May not sound natural for Indian languages
- **Fallback Behavior**: Will use English voice if Indian voice unavailable

## Current Implementation

### Frontend Component
- **File**: `components/text-to-speech.tsx`
- **Primary Method**: Web Speech API
- **Fallback**: Placeholder for future free TTS services
- **Error Handling**: Comprehensive error messages and user feedback

### API Routes
- **File**: `app/api/tts-gtts/route.ts`
- **Purpose**: Placeholder for future free TTS services
- **Current Status**: Returns fallback message

- **File**: `app/api/tts-voicerss/route.ts`
- **Purpose**: Voice RSS API integration for high-quality TTS
- **Current Status**: Fully implemented with API key integration

## Testing the TTS System

### 1. Basic Functionality
```typescript
// Test with English text first
<TextToSpeech text="Hello, this is a test" language="en" />
```

### 2. Translation + TTS
```typescript
// Test with Indian language
<TextToSpeech text="This is a test message" language="hi" />
```

### 3. Check Console Logs
Look for these messages:
```
TTS: Available voices: [list of available voices]
TTS: Starting translation from English to hi
TTS: Translation successful: [translated text]
TTS: Using Web Speech API with voice: [voice name] ([language])
TTS: Trying Voice RSS API...
TTS: Voice RSS started successfully
```

## Troubleshooting

### Common Issues

#### 1. "No suitable voice found"
**Cause**: Browser doesn't have voices for the selected language
**Solution**: 
- Try English first to test TTS functionality
- Check browser voice settings
- Use a different browser

#### 2. "Speech synthesis was blocked"
**Cause**: Browser blocked speech synthesis
**Solution**:
- Check browser permissions
- Allow microphone/speech access
- Try refreshing the page

#### 3. "Speech synthesis failed"
**Cause**: Browser doesn't support the language
**Solution**:
- Use English for testing
- Try a different language
- Check browser compatibility

### Debug Steps

1. **Check Available Voices**
   ```javascript
   console.log("Available voices:", window.speechSynthesis.getVoices())
   ```

2. **Test Translation**
   ```javascript
   // Check if translation is working
   const translated = await getTranslatedTextForTTS(text, language)
   console.log("Translated:", translated)
   ```

3. **Test TTS Directly**
   ```javascript
   // Test Web Speech API directly
   const utterance = new SpeechSynthesisUtterance("Test")
   utterance.lang = "en-US"
   window.speechSynthesis.speak(utterance)
   ```

## Future Enhancements

### 1. TTS Services
Currently integrated:
- **Web Speech API**: Primary method (built into browsers)
- **Voice RSS API**: Secondary method (high-quality TTS)
- **ResponsiveVoice.js**: Free tier available (future enhancement)
- **Browser Extensions**: User-installed TTS engines (future enhancement)

### 2. Voice Quality Improvements
- **Voice Selection**: Let users choose preferred voices
- **Speed Control**: Adjustable speech rate
- **Pitch Control**: Adjustable pitch for better clarity

### 3. Offline Support
- **Service Worker**: Cache TTS responses
- **Local Storage**: Store voice preferences
- **Progressive Web App**: Better offline experience

## Configuration

### Environment Variables
- **Voice RSS API Key**: `dc6fceed3cfc4ab4bd9ccb76af1a52ca` (configured in `app/api/tts-voicerss/route.ts`)
- **Voice RSS API URL**: `https://api.voicerss.org/`
- **Gemini API Key**: Required for translation (configured in `lib/translation.ts`)

### Customization
You can modify the TTS behavior by editing:
- `components/text-to-speech.tsx`: Frontend TTS logic
- `app/api/tts-voicerss/route.ts`: Voice RSS API configuration
- `app/api/tts-gtts/route.ts`: Backend TTS fallback
- `lib/translation.ts`: Translation settings

## Performance Considerations

### 1. Voice Loading
- Voices are loaded when the component mounts
- Consider lazy loading for better performance
- Cache voice information in localStorage

### 2. Translation Caching
- Consider caching translated text
- Implement rate limiting for API calls
- Use service worker for offline translation

### 3. Memory Management
- Clean up audio elements properly
- Cancel speech synthesis on component unmount
- Monitor memory usage with large texts

## Best Practices

### 1. User Experience
- Always show translation status
- Provide clear error messages
- Offer fallback options

### 2. Accessibility
- Include proper ARIA labels
- Support keyboard navigation
- Provide alternative text for audio content

### 3. Error Handling
- Graceful degradation
- User-friendly error messages
- Fallback to English when possible

## Conclusion

The current TTS system provides a **multi-tier solution** using Web Speech API as the primary method and Voice RSS API as a high-quality fallback. This approach offers:

- ✅ **High quality** - Voice RSS provides excellent TTS for Indian languages
- ✅ **Wide compatibility** - Web Speech API works in most modern browsers
- ✅ **Good performance** - Intelligent fallback system
- ✅ **Easy maintenance** - Minimal external dependencies
- ✅ **Cost effective** - Web Speech API is free, Voice RSS has generous limits

For production use with Indian languages, consider:
1. **User Education**: Inform users about voice limitations
2. **Fallback Options**: Provide alternative ways to consume content
3. **Voice Testing**: Test with actual users to identify issues
4. **Continuous Improvement**: Monitor and enhance based on user feedback

This system provides a solid foundation for free TTS functionality while maintaining the option to integrate paid services in the future if needed.
