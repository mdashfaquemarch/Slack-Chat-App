import { StatusCodes } from "http-status-codes";
import ChannelRepository from "../repositories/channel-respository.js";
import MessageRepository from "../repositories/message-repository.js";
import AppError from "../utils/errors/app-error.js";
import { isUserMemberOfWorkspace } from "./workspace-service.js";

const messageRepo = new MessageRepository();
const channelRepo = new ChannelRepository();

async function getMessagesService(messageParams, page, limit, userId) {
  try {

    const channelDetails = await channelRepo.getChannelWithWorkspaceDetails(messageParams.channelId);

    const workspace = channelDetails.workspaceId;

    const isMember = isUserMemberOfWorkspace(workspace, userId);

    if(!isMember) {
      throw new AppError("user is not a member of workspace", StatusCodes.UNAUTHORIZED);
    }

    const message = await messageRepo.getPaginatedMessaged(
        messageParams,
        page,
        limit
    )

    return message;
  } catch (error) {
      next(error);
  }
}


async function createMessageService(message) {
  const newMessage = await messageRepo.create(message);
  return newMessage;
}

export {
    getMessagesService,
    createMessageService
}
