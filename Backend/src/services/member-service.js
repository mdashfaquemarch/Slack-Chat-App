import { StatusCodes } from 'http-status-codes';
import UserRepository from '../repositories/user-repository.js';
import WorkspaceRepository from '../repositories/workspace-respository.js'
import AppError from '../utils/errors/app-error.js';
import { isUserMemberOfWorkspace } from './workspace-service.js';

const workspaceRepo = new WorkspaceRepository();
const userRepo = new UserRepository();


async function isMemberPartOfWorkspaceService(workspaceId, memberId) {
    try {
        const workspace = await workspaceRepo.getById(workspaceId);
        if(!workspace) {
            throw new AppError("workspace not exists", StatusCodes.NOT_FOUND);
        }
        const isUserMember = isUserMemberOfWorkspace(workspace, memberId);
        if (!isUserMember) {
            throw new AppError("user is not a member of the workspace", StatusCodes.UNAUTHORIZED);
        }
        const user = await userRepo.getById(memberId);
        return user;
    } catch (error) {
        throw error;
    }
}




export {
    isMemberPartOfWorkspaceService,
}