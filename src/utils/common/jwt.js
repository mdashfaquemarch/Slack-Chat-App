import jwt from 'jsonwebtoken'

import {Config} from '../../config/serverConfig.js'

export const createJWT = (payload) => {
  return jwt.sign(payload, Config.JWT_SECRET, {
    expiresIn: Config.JWT_EXPIRY
  })
}