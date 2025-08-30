# LibreTranslate Integration

## Overview

This Heritage Guide project now includes **dynamic multi-language translation** powered by LibreTranslate API, supporting Hindi, Telugu, Kannada, and Tamil for monument information displayed after image recognition.

## Features

✨ **Immediate Translation Preview**: See translated content right after monument recognition
🔄 **Dynamic API Translation**: Uses LibreTranslate for real-time translation
📚 **Manual Translation Fallback**: High-quality manual translations for popular monuments
🎯 **Multi-tier Approach**: Manual → LibreTranslate → Fallback
🗣️ **Audio Support**: Voice guidance in native languages

## Supported Languages

- 🇮🇳 **Hindi** (हिन्दी) - `hi`
- 🇮🇳 **Telugu** (తెలుగు) - `te` 
- 🇮🇳 **Kannada** (ಕನ್ನಡ) - `kn`
- 🇮🇳 **Tamil** (தமிழ்) - `ta`
- 🇺🇸 **English** - `en` (default)

## How It Works

### 1. Image Recognition Flow
\`\`\`
Upload Image → AI Recognition → Monument Identified → Language Preview Available
\`\`\`

### 2. Translation Priority
\`\`\`
1. Manual Translation (highest quality)
   ↓ (if not available)
2. LibreTranslate API (AI-powered)
   ↓ (if fails)
3. Fallback (partial translation with note)
\`\`\`

### 3. User Experience
- **Recognition Result**: Shows monument name and confidence
- **Language Preview**: Quick translation selector
- **Full Details**: Complete translation with audio guide

## Configuration

### Environment Variables

Add to your `.env.local`:

\`\`\`bash
# LibreTranslate API Configuration
LIBRETRANSLATE_URL=https://libretranslate.com/translate
# LIBRETRANSLATE_API_KEY=your_api_key_here (optional)
\`\`\`

### LibreTranslate Options

1. **Public Service** (Free, Rate Limited)
   \`\`\`
   LIBRETRANSLATE_URL=https://libretranslate.com/translate
   \`\`\`

2. **Hosted Instance** (Better Performance)
   \`\`\`
   LIBRETRANSLATE_URL=https://your-libretranslate-instance.com/translate
   LIBRETRANSLATE_API_KEY=your_api_key
   \`\`\`

3. **Self-Hosted** (Full Control)
   \`\`\`bash
   # Docker deployment
   docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
   
   # Then set:
   LIBRETRANSLATE_URL=http://localhost:5000/translate
   \`\`\`

## API Endpoints

### Translation API
\`\`\`
GET /api/translate?monumentId={id}&language={lang}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "name": "Translated monument name",
  "description": "Translated description",
  "location": "Translated location",
  "method": "libretranslate|manual|fallback",
  "voiceLanguage": "hi-IN"
}
\`\`\`

## Components

### 1. LanguagePreview Component
- **Location**: `components/language-preview.tsx`
- **Purpose**: Immediate translation preview after recognition
- **Features**: Language selector, translation status, quality badges

### 2. Updated Translation API
- **Location**: `app/api/translate/route.ts`
- **Features**: Multi-tier translation system
- **Methods**: Manual → LibreTranslate → Fallback

### 3. LibreTranslate Service
- **Location**: `lib/libretranslate.ts`
- **Features**: API wrapper, error handling, batch translation

## Translation Quality Indicators

- 🟢 **High Quality**: Manual translation by experts
- 🔵 **AI Translated**: LibreTranslate API powered
- 🟡 **Limited**: Fallback mode with partial translation

## Performance Considerations

### Caching Strategy
- Manual translations are static (fastest)
- LibreTranslate results could be cached client-side
- Fallback mode has minimal overhead

### Rate Limiting
- Public LibreTranslate: ~15 requests/minute
- Self-hosted: Unlimited
- Implement client-side caching for better UX

## Development

### Adding New Languages

1. Update `LANGUAGE_MAPPINGS` in `lib/libretranslate.ts`:
\`\`\`typescript
const LANGUAGE_MAPPINGS = {
  // existing languages...
  ml: 'ml', // Malayalam
}
\`\`\`

2. Add to `LANGUAGES` in `components/language-preview.tsx`:
\`\`\`typescript
const LANGUAGES = {
  // existing languages...
  ml: { name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
}
\`\`\`

3. Update voice language mapping in API.

### Adding Manual Translations

Add high-quality translations to `completeTranslations` in:
- `app/api/translate/route.ts`
- `app/monument/[id]/page.tsx`

\`\`\`typescript
"monument-id": {
  hi: {
    name: "Monument name in Hindi",
    description: "Detailed description...",
    location: "Location in Hindi"
  }
}
\`\`\`

## Testing

### Test Translation API
\`\`\`bash
curl "http://localhost:3000/api/translate?monumentId=qutub-minar&language=hi"
\`\`\`

### Test LibreTranslate Service
\`\`\`bash
# In browser console or API testing
fetch('/api/translate?monumentId=test&language=te')
  .then(r => r.json())
  .then(console.log)
\`\`\`

## Troubleshooting

### Common Issues

1. **Translation API Not Working**
   - Check LIBRETRANSLATE_URL in environment
   - Verify network connectivity
   - Check LibreTranslate service status

2. **Poor Translation Quality**
   - Consider adding manual translations for important monuments
   - Try different LibreTranslate instances
   - Check if language is properly supported

3. **Rate Limiting**
   - Use API key for higher limits
   - Implement client-side caching
   - Consider self-hosting LibreTranslate

### Error Codes

- `Translation not available`: Language not supported
- `LibreTranslate API error`: Service connectivity issue
- `Manual translation`: High-quality preset translation used

## Future Enhancements

1. **Translation Caching**: Redis/Memory cache for repeated requests
2. **Offline Mode**: Pre-translated content for common monuments
3. **User Corrections**: Community-driven translation improvements
4. **More Languages**: Extend to other Indian regional languages
5. **Audio Synthesis**: Native language text-to-speech integration

## Contributing

When adding new monuments or improving translations:

1. Add manual translations for popular monuments
2. Test LibreTranslate integration
3. Ensure proper error handling
4. Update documentation

## License

This translation integration follows the same license as the main project.
