import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getMonumentById } from "@/lib/monument-data";
import { getCharacterForMonument, generateHistoricalResponse } from "@/lib/historical-characters";

function getDirectFactualAnswer(message: string, monument: any): string | null {
  const lower = message.toLowerCase().trim();

  // Extract builder info from history field
  const getBuilderFromHistory = () => {
    if (monument.history) {
      const history = monument.history.toLowerCase();
      if (history.includes("commissioned by")) {
        const match = monument.history.match(/commissioned by ([^.]+)/i);
        return match ? match[1].trim() : null;
      }
      if (history.includes("built by")) {
        const match = monument.history.match(/built by ([^.]+)/i);
        return match ? match[1].trim() : null;
      }
      if (history.includes("shah jahan")) return "Shah Jahan";
      if (history.includes("mohammed adil shah")) return "Mohammed Adil Shah";
      if (history.includes("krishnadevaraya")) return "Krishnadevaraya";
      if (history.includes("tipu sultan")) return "Tipu Sultan";
      if (history.includes("kempe gowda")) return "Kempe Gowda";
      if (history.includes("sawai pratap singh")) return "Sawai Pratap Singh";
      if (history.includes("sawai jai singh")) return "Sawai Jai Singh";
      if (history.includes("narasimhadeva")) return "Narasimhadeva I";
      if (history.includes("chandela")) return "Chandela Dynasty";
      if (history.includes("ashoka")) return "Emperor Ashoka";
      if (history.includes("qutb-ud-din aibak")) return "Qutb-ud-din Aibak";
      if (history.includes("iltutmish")) return "Iltutmish";
      if (history.includes("guru arjan")) return "Guru Arjan";
      if (history.includes("guru ram das")) return "Guru Ram Das";
      if (history.includes("maharaja ranjit singh")) return "Maharaja Ranjit Singh";
      if (history.includes("quli qutb shah")) return "Quli Qutb Shah";
      if (history.includes("madakari nayaka")) return "Madakari Nayaka";
      if (history.includes("chamundaraya")) return "Chamundaraya";
      if (history.includes("vishnuvardhana")) return "Vishnuvardhana";
      if (history.includes("henry irwin")) return "Henry Irwin";
      if (history.includes("lal chand ustad")) return "Lal Chand Ustad";
      if (history.includes("yaqut of dabul")) return "Yaqut of Dabul";
    }
    return null;
  };

  if (lower.match(/when.*(built|constructed|made)/)) return `📅 ${monument.yearBuilt || "Date not specified"}`;
  if (lower.match(/who.*(built|constructed|made)/)) {
    const builder = getBuilderFromHistory();
    return builder ? `👤 ${builder}` : `👤 ${monument.builtBy || "Builder not specified"}`;
  }
  if (lower.match(/where.*(located|situated)/) || lower === "where") return `📍 ${monument.location}`;
  if (lower.match(/(fee|cost|price|ticket)/)) return `💰 ${monument.entryFee || "Fee information not available"}`;
  if (lower.match(/(hours|timings|time|open)/)) return `⏰ ${monument.visitingHours || "Hours not available."}`;
  if (lower.match(/(architecture|style|design)/)) return `🏛️ ${monument.name} showcases ${monument.architecture || monument.architecturalStyle || "magnificent architecture"}.`;
  if (lower.match(/(significance|important)/)) return `✨ ${monument.significance || monument.description || "Significance not available."}`;
  if (lower.match(/(history|historical|past)/)) return `📚 ${monument.history || monument.description || "History not available."}`;
  if (lower.match(/(features|architectural features)/)) {
    return monument.architecturalFeatures?.length
      ? `🏛️ Key architectural features of ${monument.name}: ${monument.architecturalFeatures.join(", ")}.`
      : `🏛️ Details about the architectural features of ${monument.name} are not available.`;
  }
  if (lower.match(/(best time to visit|visit time|when to visit)/)) return `🌸 The best time to visit ${monument.name} is typically ${monument.bestTimeToVisit || "details not available"}.`;
  if (lower.match(/(photography|photos)/)) return `📸 Photography info for ${monument.name}: ${monument.photography || "details not available."}`;
  if (lower.match(/(nearby attractions|what's nearby|places to see nearby)/)) {
    return monument.nearbyAttractions?.length
      ? `🗺️ Nearby attractions to ${monument.name}: ${monument.nearbyAttractions.join(", ")}.`
      : `🗺️ Information about nearby attractions to ${monument.name} is not available.`;
  }
  if (lower.match(/(how to reach|how to get there|transport)/)) return `🚗 ${monument.howToReach || "Transport information not available."}`;
  return null;
}

function getMayaResponse(message: string, monument: any): string {
  const lower = message.toLowerCase();
  if (lower.match(/^(hi|hello|hey|namaste)/)) return `Hello! 👋 I'm Maya, your heritage guide for ${monument.name}. What would you like to know?`;
  if (lower.match(/(thank|thanks)/)) return `You're welcome! 😊 I love sharing the stories of ${monument.name}. Any other questions?`;
  return `🏛️ I'm here to help you learn about ${monument.name}! Did you know that ${monument.significance || monument.description || "it's an important heritage site"}? You can ask me about its history, visiting info, architecture, or other interesting facts.`;
}

export async function POST(request: NextRequest) {
  try {
    const { monumentId, message, chatMode } = await request.json();
    if (!monumentId || !message) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const monument = await getMonumentById(monumentId);
    if (!monument) {
      return NextResponse.json({ error: "Monument not found" }, { status: 404 });
    }

    // Historical character mode
    if (chatMode === "historical") {
      const character = getCharacterForMonument(monumentId);
      if (character) {
        const historicalResponse = generateHistoricalResponse(character, message, monument, {});
        return NextResponse.json({
          response: historicalResponse,
          suggestions: ["Tell me about your era", "Why did you build this?", "What was your vision?"],
          mode: "historical",
          character: character.name,
        });
      }
      return NextResponse.json({
        response: `I'm sorry, but there's no historical character available for ${monument.name}. Let me help you as Maya instead! 😊`,
        suggestions: ["When was it built?", "Tell me an interesting fact", "Architecture details?"],
        mode: "maya",
      });
    }

    // PRIORITY: Use predefined responses for specific questions
    const directAnswer = getDirectFactualAnswer(message, monument);
    if (directAnswer) {
      return NextResponse.json({
        response: directAnswer,
        suggestions: ["Tell me an interesting fact", "Architecture details?", "Historical significance?"],
        mode: "maya",
      });
    }

    // FALLBACK: Use OpenAI API only for complex questions not covered by predefined responses
    if (process.env.OPENAI_API_KEY) {
      try {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000));
        
        const systemPrompt = `You are Maya, a heritage guide for ${monument.name}. Give SHORT, SPECIFIC answers.

MONUMENT INFO:
Name: ${monument.name}
Location: ${monument.location}
Built: ${monument.yearBuilt || "Ancient times"}
Significance: ${monument.significance || "Important heritage site"}
History: ${monument.history || "Details not available"}
Architecture: ${monument.architecture || "Details not available"}
Description: ${monument.description || "Details not available"}

RULES:
- Keep answers under 50 words
- Be specific and direct
- Use 1 emoji maximum
- Answer only what's asked`;

        const aiPromise = generateText({
          model: openai("gpt-4o"),
          system: systemPrompt,
          prompt: message,
          maxTokens: 100,
        });

        const { text } = (await Promise.race([aiPromise, timeoutPromise])) as any;
        return NextResponse.json({
          response: text,
          suggestions: ["Tell me more", "Interesting facts?", "Visiting information?"],
          mode: "maya",
        });
      } catch (error) {
        console.error("OpenAI API error:", error);
      }
    }

    // Final fallback to generic Maya response
    const mayaResponse = getMayaResponse(message, monument);
    return NextResponse.json({
      response: mayaResponse,
      suggestions: ["When was it built?", "Tell me an interesting fact", "Architecture details?"],
      mode: "maya",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      response: "I'm having some technical difficulties, but I'm still here to help! 😊 What would you like to know?",
      suggestions: ["When was it built?", "Entry fee?", "Interesting facts?"],
      mode: "maya",
    });
  }
}
