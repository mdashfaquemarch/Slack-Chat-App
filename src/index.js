import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import connectDB from './config/database-config.js';
import { Config } from './config/serverConfig.js';
import mailQueue from './queues/mail-queue.js';
import testQueue from './queues/test-queue.js'

import './processors/mail-processor.js';

const app = express();

// common middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// bull board configuration
const bullServerAdapter = new ExpressAdapter();
bullServerAdapter.setBasePath('/ui');

createBullBoard({
  queues: [new BullAdapter(mailQueue), new BullAdapter(testQueue)],
  serverAdapter:bullServerAdapter
});

// importing routes
import { errorHandler } from './middlewares/error-middleware.js';
import apiRoutes from './routes/index.js';

app.use('/ui', bullServerAdapter.getRouter());
app.use('/api', apiRoutes);

// Global error middleware (at the end)
app.use(errorHandler);

app.listen(Config.PORT, () => {
  console.log(
    `server is running at PORT: ${Config.PORT} Env: ${Config.NODE_ENV}`
  );
  connectDB();
});
