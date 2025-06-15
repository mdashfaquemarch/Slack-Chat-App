import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});

const _config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URL_DEV: process.env.MONGODB_URL_DEV,
  MONGODB_URL_PROD: process.env.MONGODB_URL_PROD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
  MAIL_ID: process.env.MAIL_ID,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};

export const Config = Object.freeze(_config);
