# gTTS Setup Instructions

## Quick Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start Flask Backend
```bash
python app.py
```

You should see:
```
Starting gTTS Flask Backend...
Supported languages: ['en', 'hi', 'kn', 'te', 'ta', 'mr', 'gu', 'bn', 'pa', 'or']
 * Running on http://0.0.0.0:5000
```

### 3. Start Frontend
```bash
npm run dev
```

### 4. Test the System
- Visit `http://localhost:3000/test-gtts`
- Select a language (Hindi, Kannada, Telugu, Tamil, etc.)
- Enter text or use the sample text
- Click the play button
- The system will:
  1. Translate the text to the selected language (if not English)
  2. Send it to the gTTS Flask backend
  3. Generate audio and play it

## How It Works

1. **Translation**: Text is automatically translated using Gemini API
2. **TTS Generation**: Translated text is sent to Flask backend with gTTS
3. **Audio Playback**: Generated MP3 audio is streamed back and played

## Supported Languages

- English (en)
- Hindi (hi)
- Kannada (kn)
- Telugu (te)
- Tamil (ta)
- Marathi (mr)
- Gujarati (gu)
- Bengali (bn)
- Punjabi (pa)
- Odia (or)

## Troubleshooting

### Backend Not Starting
```bash
# Check if port 5000 is available
netstat -an | grep 5000

# If port is busy, change port in app.py
app.run(host='0.0.0.0', port=5001, debug=True)
```

### Frontend Can't Connect
- Make sure Flask backend is running on port 5000
- Check browser console for CORS errors
- Verify the backend URL in the TTS component

### Audio Not Playing
- Check browser audio settings
- Try a different browser
- Check console for errors

## Integration

The gTTS system is now integrated into the main `TextToSpeech` component. When you use it anywhere in your app:

```tsx
<TextToSpeech text="Hello world" language="hi" />
```

It will automatically:
1. Try Web Speech API first (for speed)
2. Fall back to gTTS Flask backend (for quality)
3. Show appropriate status messages
