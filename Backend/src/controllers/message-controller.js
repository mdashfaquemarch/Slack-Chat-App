import { getMessagesService } from "../services/message-service.js";


async function getMessagesController(req, res, next) {
    try {


        const messages = await getMessagesService(
            {
                channelId: req.params.channelId,
            },
            req.query.page || 1,
            req.query.limit || 20,
            req.user
        );
        return res.status(StatusCodes.OK).json({
            success: true,
            data: messages,
            message: 'messages fetched successfully'
        });
    } catch (error) {
        next(error);
    }
}


export {
    getMessagesController
}