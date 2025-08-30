import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY not configured",
        status: "error"
      }, { status: 500 })
    }

    // Test with a simple translation request
    const testText = "Hello, this is a test."
    const targetLanguage = "Kannada"

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Translate the following text into ${targetLanguage}. Only provide the translated text without any additional context or explanations:\n\n${testText}`
            }
          ]
        }
      ]
    }

    console.log("Testing Gemini API with:", { testText, targetLanguage })

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API test failed:", response.status, errorText)
      return NextResponse.json({ 
        error: `Gemini API test failed: ${response.status}`,
        details: errorText,
        status: "error"
      }, { status: response.status })
    }

    const data = await response.json()
    
    if (data.error) {
      console.error("Gemini API returned error:", data.error)
      return NextResponse.json({ 
        error: `Gemini API error: ${data.error.message}`,
        status: "error"
      }, { status: 400 })
    }

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ 
        error: "No translation response from Gemini API",
        status: "error"
      }, { status: 400 })
    }

    const translatedText = data.candidates[0].content.parts[0].text.trim()
    console.log("Gemini API test successful:", { original: testText, translated: translatedText })

    return NextResponse.json({ 
      success: true,
      original: testText,
      translated: translatedText,
      targetLanguage,
      status: "success"
    })

  } catch (error: any) {
    console.error("Gemini API test error:", error)
    return NextResponse.json({ 
      error: `Internal server error: ${error.message}`,
      status: "error"
    }, { status: 500 })
  }
}
