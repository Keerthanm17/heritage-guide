import requests
import json

def test_tts():
    url = "http://localhost:5000/tts"
    headers = {"Content-Type": "application/json"}
    
    # Test data
    data = {
        "text": "नमस्ते दुनिया",
        "language": "hi"
    }
    
    try:
        print("Testing gTTS backend with Hindi text...")
        print(f"Text: {data['text']}")
        print(f"Language: {data['language']}")
        
        response = requests.post(url, headers=headers, json=data)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Success! Audio file generated.")
            print(f"Content-Type: {response.headers.get('Content-Type')}")
            print(f"Content-Length: {response.headers.get('Content-Length')}")
            
            # Save the audio file
            with open("test_output.mp3", "wb") as f:
                f.write(response.content)
            print("✅ Audio file saved as 'test_output.mp3'")
            
        else:
            print("❌ Error:")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    test_tts()
