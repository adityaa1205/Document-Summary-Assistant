// server/controllers/summaryController.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure env variables are loaded here too
dotenv.config({ override: true });

// Create Gemini instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeText(text, lengthLabel = "medium") {
  try {
    const prompt = `Summarize the following text in a ${lengthLabel} format.
Highlight the key ideas and main points:

${text}`;

    // Use fast "flash" model (or change to "gemini-1.5-pro" for better quality)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    // Extract text safely
    const summary = result.response?.text() ?? "⚠️ No summary generated.";
    return summary;

  } catch (err) {
    console.error("❌ Gemini summarization error:", err.message);
    throw err;
  }
}
