# 🏛️ AI-Driven Smart Heritage Tourism Guide  
1




An intelligent tourism assistant that combines **AI, Machine Learning, and Next.js** to recognize monuments, provide detailed cultural insights, and deliver a multilingual, voice-enabled experience for travellers .
----

## ✨ Features  

- 🖼️ **Image Recognition** → Upload/capture monument images and get instant details.  
- 🗣️ **Text-to-Speech (TTS)** → Listen to monument information in natural voice.  
- 🌍 **Multilingual Support** → Supports multiple Indian & international languages.  
- 💬 **AI Chatbot** → Ask follow-up questions and get intelligent responses.  
- 📊 **Custom ML Model** → Uses a trained classifier for monument recognition.  
- ⚡ **Modern Web App** → Built with Next.js + TailwindCSS for fast performance.  

---

## 🛠️ Tech Stack  

- **Frontend** → Next.js (TypeScript), TailwindCSS  
- **Backend** → Next.js API Routes, Node.js  
- **AI/ML** → Python (TensorFlow/Keras), OpenAI API  
- **TTS** → gTTS, VoiceRSS integration  
- **Other Tools** → Jest (testing), PostCSS, ESLint  

---

## 📂 Project Structure (simplified)  

ki/
├── app/ # Next.js frontend (pages, layouts, styles)
│ ├── page.tsx # Home page
│ ├── about/ # About section
│ ├── api/ # API routes (chat, image-recognition, monuments)
│ └── globals.css # Global styles
├── train_monument_model.py # Python script for training ML model
├── openai.ts # OpenAI integration
├── package.json # Project dependencies
├── tailwind.config.ts # TailwindCSS config
├── tsconfig.json # TypeScript config
└── ... # Other configs & guides

### Install Dependencies
# Using npm
npm install

# Or using pnpm
pnpm install

### Run development server
npm run dev
open http://localhost:3000

### ⚙️ Environment Variables

Create a .env.local file in the ki/ directory and add:
OPENAI_API_KEY=your_openai_api_key
VOICERSS_API_KEY=your_voicerss_api_key

### 📖 Usage

- Upload an image of a monument → get recognition + historical details.

- Use text-to-speech → listen to information.

- Chat with AI assistant → ask deeper questions.

### 🧪 Testing
npm run test

### 📜 License
This project is licensed under the MIT License – see the LICENSE
 file for details.
