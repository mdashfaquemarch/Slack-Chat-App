import express from 'express';

import pingRoutes from './ping-route.js';
import userRoutes from './user-route.js';
import workspaceRoutes from './workspace-route.js';
import channelRoutes from './channel-route.js';
import memberRoutes from './member-route.js'

const router = express.Router();

router.use('/ping', pingRoutes);
router.use('/users', userRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/channels', channelRoutes);
router.use("/members", memberRoutes);

export default router;
