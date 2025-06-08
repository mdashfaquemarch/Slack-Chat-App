import express from 'express'

import {signUpController} from '../../controllers/user-controller.js'

const router = express.Router();


router.post("/", signUpController);


export default router;