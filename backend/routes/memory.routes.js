import express from "express";

import protectRoute from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  createMemory,
  getMemories,
} from "../controllers/memory.controller.js";

const router = express.Router();


// Get logged-in user's memories
router.get( "/", getMemories
);


// Upload memory
router.post(
  "/",
  protectRoute,
  upload.single("media"),
  createMemory
);

export default router;