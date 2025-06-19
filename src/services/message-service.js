import MessageRepository from "../repositories/message-repository.js";

const messageRepo = new MessageRepository();

async function getMessagesService(messageParams, page, limit) {
  try {
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

export {
    getMessagesService
}
