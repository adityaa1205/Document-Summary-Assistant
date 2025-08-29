// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ override: true });

const app = express();

// ✅ Restrict CORS to only your frontend
app.use(
  cors({
    origin: "https://your-frontend.vercel.app", // 🔹 replace with your actual Vercel URL
    credentials: true,
  })
);

app.use(express.json());

// Debug log to confirm key is loaded
console.log(
  "✅ GEMINI_API_KEY:",
  process.env.GEMINI_API_KEY?.slice(0, 10) + "..."
);

// Routes
import fileroutes from "./routes/fileroutes.js";
app.use("/api", fileroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
