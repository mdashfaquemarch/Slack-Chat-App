import Workspace from '../models/workspace-model.js'
import CrudRepository from './crud-repository.js';
import AppError from './../utils/errors/app-error.js'
import { StatusCodes } from 'http-status-codes';
import User from '../models/user-model.js'

class WorkspaceRepository extends CrudRepository {

    constructor() {
        super(Workspace)
    }

    async getWorkspaceByName(workspaceName) {
        const workspace = await Workspace.findOne({
            name: workspaceName
        })

        if (!workspace) {
            throw new AppError("Workspace not found", StatusCodes.NOT_FOUND);
        }

        return workspace;
    }
    async getWorkspaceByJoinCode(joinCode) {
        const workspace = await Workspace.findOne({
            joinCode: joinCode
        })

        if (!workspace) {
            throw new AppError("Workspace not found", StatusCodes.NOT_FOUND);
        }

        return workspace;
    }

    async addMemberToWorkspace(workspaceId, memberId, role) {
        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            throw new AppError("Workspace not found", StatusCodes.NOT_FOUND);
        }

        // check user(memberId) id valid or not

        const isValidUser = await User.findById(memberId);

        if (!isValidUser) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }

        // check member already exists or not

        const isMemberAlreadyPartOfWorkspace = workspace.members.find((member) => member.memberId === memberId)

        if (isMemberAlreadyPartOfWorkspace) {
            throw new AppError("user already part of workspace", StatusCodes.FORBIDDEN);
        }

        workspace.members.push({
            memberId,
            role
        })

        await workspace.save();
        return workspace;
    }

    async addChannelToWorkspace() {

    }

    async fetchAllWorkspaceByMemberId() {

    }
}

export default WorkspaceRepository;