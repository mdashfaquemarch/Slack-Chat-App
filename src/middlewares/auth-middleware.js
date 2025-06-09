import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import { Config } from "../config/serverConfig.js";

import UserRepository from "../repositories/user-repository.js";

const userRepo = new UserRepository();


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if(!token) {
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: "No auth token provided"
            })
        }

        const decodedToken = jwt.verify(token, Config.JWT_SECRET);

        const user = await userRepo.getById(decodedToken.id);
        console.log(user)
        req.user = user._id;
        next();

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: "Interal server Error",
            error: error
        })
    }
}