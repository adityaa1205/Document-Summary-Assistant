
// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config({ override: true });

const app = express();

// ------------------- Middleware -------------------
const allowedOrigins = [
  "http://localhost:3000",                 // local dev
  "https://document-summary-assistant-omega.vercel.app"       // 🔁 replace with your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Debug log for GEMINI API key
if (process.env.GEMINI_API_KEY) {
  console.log("✅ GEMINI_API_KEY loaded");
} else {
  console.warn("⚠️ GEMINI_API_KEY is missing in .env");
}

// ------------------- Routes -------------------
import fileRoutes from "./routes/fileroutes.js";
app.use("/api", fileRoutes);

// ------------------- Serve Frontend (Production) -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../client/build"); // adjust if your frontend folder name differs
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ------------------- Error Handler -------------------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
