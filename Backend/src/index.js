import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// ✅ CORS Configuration (Fixed)
const allowedOrigins = [
  "http://localhost:5173",            // Vite local frontend
  "http://localhost:3000",            // CRA local frontend
  "https://contact-listing.onrender.com" // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g. Postman, mobile)
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

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ JSON body parsing
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Example test route
app.get("/", (req, res) => res.send("Backend running successfully 🚀"));

// ✅ Your routes (uncomment and adjust path if needed)
// import userRoutes from "./routes/userRoutes.js";
// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const app = express();

// // ✅ Allow CORS from your local and deployed frontend
// app.use(cors({
//   origin: ["http://localhost:5173", "https://your-frontend-domain.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
















// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGODB_URI;
//     if (!uri) {
//       throw new Error("❌ MONGODB_URI is not defined in .env file");
//     }

//     console.log("Connecting to MongoDB with URI:", uri);

//     // ✅ New syntax for Mongoose 7+
//     const conn = await mongoose.connect(uri);

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;









// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../.env") }); // ✅ correct relative path
// console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

// import express from "express";
// import cors from "cors";
// import connectDB from "./db/index.js";
// import userRoute from "./routes/user.route.js";

// const app = express();
// const port = process.env.PORT || 5000;

// // Middlewares
// app.use(
//   cors({
//     origin: [
//       "https://contact-listing-c8lt.vercel.app",
//       "https://www.contact-listing-c8lt.vercel.app",
//     ],
//     methods: ["GET", "POST", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Route
// app.use("/api/users", userRoute);

// // Connect to DB and start server
// connectDB()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server running on port: ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to database:", error);
//   });

// export default app;


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import userRoute from "./routes/user.route.js";

// dotenv.config();

// const app = express();
// const port = process.env.MONGODB_URI || 5000;

// // Middlewares
// app.use(
//   cors({
//     origin: [
//       "https://contact-listing-c8lt.vercel.app",
//       "https://www.contact-listing-c8lt.vercel.app",
//     ],
//     methods: ["GET", "POST", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // route
// app.use("/api/users", userRoute);

// connectDB()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server running on port: ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to database:", error);
//   });

// export default app;
