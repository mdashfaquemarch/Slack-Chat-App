import express from 'express';

import connectDB from './config/database-config.js';
import { Config } from './config/serverConfig.js';
const app = express();

// common middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// importing routes
import {errorHandler} from './middlewares/error-middleware.js';
import apiRoutes from './routes/index.js';

app.use("/api", apiRoutes);

// Global error middleware (at the end)
app.use(errorHandler);

app.listen(Config.PORT, () => {
  console.log(
    `server is running at PORT: ${Config.PORT} Env: ${Config.NODE_ENV}`
  );
  connectDB();
});
