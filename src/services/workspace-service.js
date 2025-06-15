import WorkspaceRepository from "../repositories/workspace-respository.js"
import { v4 as uuidv4 } from 'uuid';
import AppError from "../utils/errors/app-error.js";
import { StatusCodes } from "http-status-codes";
import ChannelRepository from "../repositories/channel-respository.js";
import UserRepository from "../repositories/user-repository.js";
import { addEmailToMailQueue } from "../producers/mailQueue-producer.js";
import { workspaceJoinMail } from "../utils/common/mailObject.js";


const workspaceRepo = new WorkspaceRepository();
const channelRepo = new ChannelRepository();
const userRepo = new UserRepository()

// isAdmin fn

function isAdmin(workspace, userId) {
    const isValidAdmin = workspace.members.find((member) => (member.memberId.toString() === userId.toString() || member.memberId._id.toString() === userId.toString()) && member.role === "admin");
    return isValidAdmin;
}

// check if user is member of workspace

export function isUserMemberOfWorkspace(workspace, userId) {
    const isValidWorkspaceMember = workspace.members.find((member) => member.memberId.toString() === userId.toString());
    return isValidWorkspaceMember;
}

// check if channel is already present in workspace or not

function isChannelAlreadyPartOfWorkspace(workspace, channelName) {
    return workspace.channels.find((channel) => channel.name.toLowerCase() === channelName.toLowerCase());
}

async function createWorkspaceService(workspaceData) {
    try {

        let joinCode = uuidv4().substring(0, 6)
        const response = await workspaceRepo.create({
            name: workspaceData.name,
            description: workspaceData.description,
            joinCode: joinCode.toUpperCase()
        });

        await workspaceRepo.addMemberToWorkspace(response._id, workspaceData.owner, "admin");

        const workspace = await workspaceRepo.addChannelToWorkspace(response._id, "general");

        return workspace;
    } catch (error) {
        throw error;
    }
}

async function getWorkspacesUserIsMemberOfService(userId) {
    try {
        const workspaces = await workspaceRepo.fetchAllWorkspaceByMemberId(userId);
        return workspaces;
    } catch (error) {
        throw error;
    }
}

async function deleteWorkspaceService(workspaceId, userId) {
    try {
        const workspace = await workspaceRepo.getById(workspaceId);

        if (!workspace) {
            throw new AppError("workspace not found", StatusCodes.NOT_FOUND);
        }

        const isValidAdmin = isAdmin(workspace, userId);

        if (!isValidAdmin) {
            throw new AppError("User is not an admin", StatusCodes.BAD_REQUEST);
        }

        // const channelIds = workspace.channels.map((channel) => channel._id)

        await channelRepo.deleteMany(workspace.channels);
        const response = await workspaceRepo.delete(workspaceId);
        return response;
    } catch (error) {
        throw error;
    }
}


async function getWorkspaceService(workspaceId, userId) {
    try {
        const workspace = await workspaceRepo.getById(workspaceId);

        if (!workspace) {
            throw new AppError("workspace not found", StatusCodes.NOT_FOUND);
        }

        const isMember = isUserMemberOfWorkspace(workspace, userId);

        if (!isMember) {
            throw new AppError("user is not a member of workspace", StatusCodes.UNAUTHORIZED);
        }

        return workspace;

    } catch (error) {
        throw error;
    }
}

async function getWorkspaceByJoinCodeService(joinCode, userId) {
    try {
        const workspace = await workspaceRepo.getWorkspaceByJoinCode(joinCode);
        if (!workspace) {
            throw new AppError("workspace not found", StatusCodes.NOT_FOUND);
        }

        const isMember = isUserMemberOfWorkspace(workspace, userId);

        if (!isMember) {
            throw new AppError("User is not a member of the workspace", StatusCodes.UNAUTHORIZED);
        }

        return workspace;
    } catch (error) {
        throw error;
    }
}

async function updateWorkspaceService(workspaceId, workspaceData, userId) {
    try {
        const workspace = await workspaceRepo.getById(workspaceId);

        if (!workspace) {
            throw new AppError("workspace not found", StatusCodes.NOT_FOUND);
        }

        const isValidAdmin = isAdmin(workspace, userId);

        if (!isValidAdmin) {
            throw new AppError("User is not an admin of workspace", StatusCodes.UNAUTHORIZED);
        }

        const updatedWorkspace = await workspaceRepo.update(workspaceId, workspaceData);

        return updatedWorkspace;

    } catch (error) {
        throw error;
    }
}

async function addMemberToWorkspaceService(workspaceId, memberId, role, userId) {
    try {
        const workspace = await workspaceRepo.getById(workspaceId);

        if (!workspace) {
            throw new AppError("workspace not found", StatusCodes.NOT_FOUND);
        }

        const isValidUser = await userRepo.getById(userId);

        if (!isValidUser) {
            throw new AppError("user is not valid", StatusCodes.NOT_FOUND);
        }

        const isValidAdmin = isAdmin(workspace, userId);

        if (!isValidAdmin) {
            throw new AppError("User is not an admin of workspace", StatusCodes.UNAUTHORIZED);
        }

        const isMember = isUserMemberOfWorkspace(workspace, memberId);
        if (isMember) {
            throw new AppError("User is already a member of workspace", StatusCodes.BAD_REQUEST);
        }

        const response = await workspaceRepo.addMemberToWorkspace(workspaceId, memberId, role);

        addEmailToMailQueue({...workspaceJoinMail(workspace), to: isValidUser.email})

        return response;

    } catch (error) {
        throw error;
    }
}


async function addChannelToWorkspaceService(workspaceId, channelName, userId) {
    try {
        const workspace = await workspaceRepo.getWorkspaceDetailsById(workspaceId);

        if (!workspace) {
            throw new AppError("workspace not found", StatusCodes.NOT_FOUND);
        }

        const isChannelPresent = isChannelAlreadyPartOfWorkspace(workspace, channelName);

        if (isChannelPresent) {
            throw new AppError("Channel already part of workspace", StatusCodes.BAD_REQUEST);
        }

        const isValidAdmin = isAdmin(workspace, userId);

        if (!isValidAdmin) {
            throw new AppError("user is not an admin of workspace", StatusCodes.UNAUTHORIZED);
        }

        const response = await workspaceRepo.addChannelToWorkspace(
            workspaceId,
            channelName
        );

        return response;
    } catch (error) {
        throw error;
    }
}

export {
    createWorkspaceService,
    getWorkspacesUserIsMemberOfService,
    deleteWorkspaceService,
    getWorkspaceService,
    getWorkspaceByJoinCodeService,
    updateWorkspaceService,
    addMemberToWorkspaceService,
    addChannelToWorkspaceService
}