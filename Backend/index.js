import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";
import paymentRoute from "./route/payment.route.js";

const app = express();

const allowedOrigins = [
  "https://book-store-3-7jsp.onrender.com",
  "https://book-store-one-gamma.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    const isVercelApp = origin?.endsWith(".vercel.app");

    if (!origin || allowedOrigins.includes(origin) || isVercelApp) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, { dbName: "bookStore" })
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/payment", paymentRoute);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Close the old process and try again.`);
    process.exit(1);
  } else {
    console.error("Server error:", error);
    process.exit(1);
  }
});
