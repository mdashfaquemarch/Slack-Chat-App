import {StatusCodes} from 'http-status-codes'

import { signInService, signUpService } from "../services/user-service.js";



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

async function signInController(req, res, next) {
    try {
       
        const response = await signInService(req.body);
       
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response,
            message: "User signin successfully"
        })
    } catch (error) {
        next(error);
    }
}


export {
    signInController,
    signUpController}