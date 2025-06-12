import express from 'express';

import pingRoutes from './ping-route.js';
import userRoutes from './user-route.js';
import workspaceRoutes from './workspace-route.js'

const router = express.Router();

router.use('/ping', pingRoutes);
router.use('/users', userRoutes);
router.use("/workspaces", workspaceRoutes);

export default router;
