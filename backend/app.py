from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from gtts import gTTS
import os
import tempfile
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Language mapping for gTTS
LANGUAGE_MAPPING = {
    "en": "en",
    "hi": "hi",  # Hindi
    "kn": "kn",  # Kannada
    "te": "te",  # Telugu
    "ta": "ta",  # Tamil
    "mr": "mr",  # Marathi
    "gu": "gu",  # Gujarati
    "bn": "bn",  # Bengali
    "pa": "pa",  # Punjabi
    "or": "or"   # Odia
}

@app.route('/tts', methods=['POST'])
def tts():
    try:
        data = request.get_json()
        text = data.get("text", "")
        language = data.get("language", "en")
        
        if not text:
            return jsonify({"error": "Text is required"}), 400
        
        # Validate language
        if language not in LANGUAGE_MAPPING:
            return jsonify({"error": f"Unsupported language: {language}"}), 400
        
        lang_code = LANGUAGE_MAPPING[language]
        
        print(f"Generating TTS for language: {language} ({lang_code})")
        print(f"Text: {text[:100]}...")
        
        # Create gTTS object
        tts = gTTS(text=text, lang=lang_code, slow=False)
        
        # Create temporary file
        temp_dir = tempfile.gettempdir()
        filename = f"tts_{uuid.uuid4().hex}.mp3"
        filepath = os.path.join(temp_dir, filename)
        
        # Save the audio file
        tts.save(filepath)
        
        print(f"Audio file saved: {filepath}")
        
        # Send the file
        return send_file(
            filepath,
            as_attachment=True,
            download_name=f"tts_{language}.mp3",
            mimetype="audio/mpeg"
        )
        
    except Exception as e:
        print(f"Error in TTS generation: {str(e)}")
        return jsonify({"error": f"TTS generation failed: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "gTTS Flask Backend"})

@app.route('/languages', methods=['GET'])
def get_languages():
    return jsonify({
        "languages": LANGUAGE_MAPPING,
        "supported_languages": list(LANGUAGE_MAPPING.keys())
    })

if __name__ == "__main__":
    print("Starting gTTS Flask Backend...")
    print("Supported languages:", list(LANGUAGE_MAPPING.keys()))
    app.run(host='0.0.0.0', port=5000, debug=True)
