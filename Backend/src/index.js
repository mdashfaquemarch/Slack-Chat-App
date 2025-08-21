import './processors/mail-processor.js';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import cors from 'cors'
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './config/database-config.js';
import { Config } from './config/serverConfig.js';
import mailQueue from './queues/mail-queue.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const corsOptions = {
  origin: process.env.FRONTEND_URL, // or ['https://site1.com', 'https://site2.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};


// cors
app.use(cors(corsOptions))

// common middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// bull board configuration
const bullServerAdapter = new ExpressAdapter();
bullServerAdapter.setBasePath('/ui');

createBullBoard({
  queues: [new BullAdapter(mailQueue)],
  serverAdapter:bullServerAdapter
});

// importing routes
import channelSocketHandler from './controllers/channelSocket-controller.js'
import messageSocketHandler from './controllers/messageSocket-controller.js';
import { errorHandler } from './middlewares/error-middleware.js';
import apiRoutes from './routes/index.js';


app.use('/ui', bullServerAdapter.getRouter());
app.use('/api', apiRoutes);
 
io.on('connection', (socket) => {
  messageSocketHandler(io, socket);
  channelSocketHandler(io, socket);
});

// Global error middleware (at the end)
app.use(errorHandler);

server.listen(Config.PORT, () => {
  console.log(
    `server is running at PORT: ${Config.PORT} Env: ${Config.NODE_ENV}`
  );
  connectDB();
});
