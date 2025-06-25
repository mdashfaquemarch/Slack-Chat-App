import express from "express";
import { isAuthenticated } from '../../middlewares/auth-middleware.js';
import { getMessagesController } from "../../controllers/message-controller.js";

const router = express.Router();

router.get("/:channelId", isAuthenticated, getMessagesController);

export default router;