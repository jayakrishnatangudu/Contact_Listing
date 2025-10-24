import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: "https://contact-listing-c8lt.vercel.app/",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// route
app.use("/api/users", userRoute);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });

export default app;
