import { signUpService } from "../services/user-service.js";

import {StatusCodes} from 'http-status-codes'



async function signUpController(req, res, next) {
    try {
        const response = await signUpService(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: response,
            message: "User signup successfully"
        })
    } catch (error) {
        next(error);
    }
}


export {
    signUpController
}