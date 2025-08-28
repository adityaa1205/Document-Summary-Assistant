import fs from "fs";
import path from "path";
import parsePDF from "../utils/pdfParser.js";
import doOCR from "../utils/ocr.js";
import { summarizeText } from "./summarycontroller.js";

export const processFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const ext = path.extname(file.originalname).toLowerCase();
    let extractedText = "";

    if (ext === ".pdf") {
      extractedText = await parsePDF(file.path);
    } else {
      // treat everything else as image
      extractedText = await doOCR(file.path);
    }

    // cleanup uploaded file
    fs.unlinkSync(file.path);

    // pass to summarizer
    const length = req.body.length || "medium";
    const summary = await summarizeText(extractedText, length);

    res.json({ text: extractedText, summary });

  } catch (err) {
    console.error("❌ File processing error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
