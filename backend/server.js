import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import memoryRoutes from "./routes/memory.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// ============================================================
// CORS
// ============================================================

const allowedOrigins = [
  "http://localhost:5173",

  // Add your Vercel frontend URL here later
   "https://avantika-s-world.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {

      // Allow requests without an origin
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);


// ============================================================
// BODY PARSING
// ============================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ============================================================
// COOKIE
// ============================================================

app.use(cookieParser());


// ============================================================
// ROUTES
// ============================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/memories",
  memoryRoutes
);


// ============================================================
// TEST
// ============================================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});


// ============================================================
// 404
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// ============================================================
// DATABASE + SERVER
// ============================================================

const startServer = async () => {
  try {

    await connectDB();

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );

  } catch (error) {

    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();