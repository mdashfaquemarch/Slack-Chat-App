import express from "express";

import { getMessagesController } from "../../controllers/message-controller.js";
import { isAuthenticated } from '../../middlewares/auth-middleware.js';

const router = express.Router();

router.get("/:channelId", isAuthenticated, getMessagesController);

export default router;