import express from 'express'

import pingRoutes from './ping-route.js'


const router = express.Router();

router.use("/ping", pingRoutes);

export default router;