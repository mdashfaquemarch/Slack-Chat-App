import dotenv from 'dotenv';

dotenv.config({
  "path": "./.env"
});

const _config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URL_DEV: process.env.MONGODB_URL_DEV,
  MONGODB_URL_PROD: process.env.MONGODB_URL_PROD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY
};

export const Config = Object.freeze(_config);
