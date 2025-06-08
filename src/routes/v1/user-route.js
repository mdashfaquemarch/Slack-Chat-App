import express from 'express'

import {signUpController} from '../../controllers/user-controller.js'
import { userSignupSchema } from '../../validators/userSchema.js';
import {validate} from '../../validators/zodValidator.js'

const router = express.Router();


router.post("/signup",validate(userSignupSchema), signUpController);


export default router;