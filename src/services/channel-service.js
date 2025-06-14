import { StatusCodes } from 'http-status-codes';
import ChannelRepository from '../repositories/channel-respository.js'
import AppError from '../utils/errors/app-error.js'
import { isUserMemberOfWorkspace } from './workspace-service.js';


const channelRepo = new ChannelRepository();

async function getChannelByIdService(channelId, userId) {
    try {
        const channel = await channelRepo.getChannelWithWorkspaceDetails(channelId);
        if(!channel || !channel.workspaceId) {
            throw new AppError("Channel not found with the provided ID", StatusCodes.NOT_FOUND);
        }
        const isUserPartofWorkspace = isUserMemberOfWorkspace(channel.workspaceId, userId);

        if(!isUserPartofWorkspace) {
            throw new AppError("User is not a member of the workspace", StatusCodes.UNAUTHORIZED);
        }
        
        return channel;
    } catch (error) {
        throw error;
    }
}

export {
    getChannelByIdService
}