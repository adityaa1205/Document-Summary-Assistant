import Tesseract from "tesseract.js";

/**
 * Extract text from an image using Tesseract.js
 * @param {string} filePath - Path to the uploaded image
 * @returns {Promise<string>} Extracted text
 */
export default async function doOCR(filePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, "eng", {
      logger: (m) => console.log("[OCR]", m.status, m.progress)
    });
    return text;
  } catch (err) {
    console.error("❌ OCR error:", err.message);
    throw err;
  }
}
