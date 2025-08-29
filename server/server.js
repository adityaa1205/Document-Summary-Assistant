// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


app.use(cors({
  origin: "*", // temporary: use "*" until frontend deployed
  credentials: true
}));


// Load environment variables
dotenv.config({ override: true });

const app = express();
app.use(cors());
app.use(express.json());

// Debug log to confirm key is loaded
console.log("✅ GEMINI_API_KEY:", process.env.GEMINI_API_KEY?.slice(0, 10) + "...");

// Routes
import fileroutes from "./routes/fileroutes.js";
app.use("/api", fileroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
