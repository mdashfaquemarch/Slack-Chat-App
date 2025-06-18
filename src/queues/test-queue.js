import Queue from 'bull'
import { Config } from '../config/serverConfig.js';

export default new Queue('testQueue', {
  redis: {
    host: Config.REDIS_HOST,
    port: Config.REDIS_PORT
  }
}, );