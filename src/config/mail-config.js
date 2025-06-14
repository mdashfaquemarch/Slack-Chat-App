import nodemailer from 'nodemailer';
import { Config } from './serverConfig.js';


export default nodemailer.createTransport(
    {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: Config.MAIL_ID,
            pass: Config.MAIL_PASSWORD,
        },
    }
)