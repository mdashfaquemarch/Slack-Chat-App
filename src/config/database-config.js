import mongoose from 'mongoose';

import { Config } from './serverConfig.js';

const connectDB = async () => {
  try {
    if (Config.NODE_ENV === 'development') {
      await mongoose.connect(Config.MONGODB_URL_DEV);
    }

    if (Config.NODE_ENV === 'production') {
      await mongoose.connect(Config.MONGODB_URL_PROD);
    }

    console.log(
      `connected to mongodb datatabse Successfully from ENV: ${Config.NODE_ENV}`
    );
  } catch (error) {
    console.log(`Error connecting to database `, error);
  }
};

export default connectDB;
