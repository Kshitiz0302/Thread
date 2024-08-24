import express from "express";
import { getMessages, sendMessage, markMessageAsSeen } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/mark-seen", protectRoute, markMessageAsSeen); 

export default router;
