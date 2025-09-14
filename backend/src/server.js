// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import priceRoutes from "./routes/priceRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://tecezetask.netlify.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you use cookies/auth
}));

app.use(express.json({ limit: "1mb" }));

// Mongo
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pricebook";
mongoose
  .connect(MONGO_URI, { dbName: "pricebook" })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => {
    console.error("Mongo error:", e.message);
    process.exit(1);
  });

// Routes
app.use("/api/price", priceRoutes);

// Health
app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API on http://localhost:" + PORT));
