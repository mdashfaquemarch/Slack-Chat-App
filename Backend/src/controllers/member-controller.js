import { StatusCodes } from "http-status-codes";
import { isMemberPartOfWorkspaceService } from "../services/member-service.js";



async function isMemberPartOfWorkspaceController(req, res, next) {
    try {
        const response = await isMemberPartOfWorkspaceService(
            req.params.workspaceId,
            req.user
        );

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                data: response,
                message: 'User is a member of workspace'
            })

    } catch (error) {
        next(error);
    }
}


export {
    isMemberPartOfWorkspaceController,
}