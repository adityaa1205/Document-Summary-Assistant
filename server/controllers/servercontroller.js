import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const CHUNK_SIZE = 12_000; // chars — tune as needed

function chunkText(text, size=CHUNK_SIZE){
  const chunks = [];
  for (let i=0; i<text.length; i+=size) chunks.push(text.slice(i, i+size));
  return chunks;
}

function buildPrompt(chunk, lengthLabel){
  return `Summarize the following text in a ${lengthLabel} format.
Keep key facts and main ideas. Use bullet points for clarity if short.
Text:
${chunk}`;
}

export async function summarizeText(fullText, lengthLabel='medium'){
  // if small enough, single call
  const chunks = fullText.length > CHUNK_SIZE ? chunkText(fullText) : [fullText];

  // map: summarize each chunk
  const chunkSummaries = [];
  for (const c of chunks){
    const prompt = buildPrompt(c, lengthLabel);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      // optional config: thinkingBudget: 0 to reduce time/cost
      // config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    // response.text() or response.text depending on SDK — quickstart uses response.text
    const summary = response.text?.() ?? response.text ?? String(response);
    chunkSummaries.push(summary.trim());
  }

  if (chunkSummaries.length === 1) return chunkSummaries[0];

  // reduce: summarize the summaries into a final summary
  const combined = chunkSummaries.join('\n\n');
  const finalPrompt = `Combine and compress these partial summaries into a coherent ${lengthLabel} summary. Preserve important facts:\n\n${combined}`;
  const finalResp = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: finalPrompt
  });
  return finalResp.text?.() ?? finalResp.text ?? String(finalResp);
}
