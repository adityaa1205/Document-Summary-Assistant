import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fileRoutes from "./routes/fileroutes.js";

// Load environment variables
dotenv.config({ override: true });

const app = express();

// ------------------- Middleware -------------------
// Allow requests from frontend domains
const allowedOrigins = [
  "http://localhost:3000",                         // local dev
  "https://document-summary-assistant-omega.vercel.app" // deployed frontend
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

// Parse JSON requests
app.use(express.json());

// ------------------- Routes -------------------
app.use("/api", fileRoutes);

// ------------------- Serve Frontend (Production) -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../client/build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ------------------- Global Error Handler -------------------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
