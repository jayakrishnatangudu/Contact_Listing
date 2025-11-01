import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

// ✅ Properly load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allowed CORS origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://contact-listing.onrender.com",
  "https://contact-listing-4qy2.onrender.com",
  "https://contact-listing-c8lt.vercel.app",
  "https://www.contact-listing-c8lt.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error("CORS not allowed for this origin: " + origin),
          false
        );
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Connection event listeners
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

// Default homepage route
app.get("/", (req, res) => res.send("Backend running successfully 🚀"));

// User routes
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
