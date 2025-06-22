import { createMessageService } from "../services/message-service.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/event-constants.js";



export default function messageHandler(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHander(data, cb) {
    const {channelId} = data;
    const messageResponse = await createMessageService(data);
    // socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse)
    cb({
      success: true,
      message: "Successfully created the message",
      data: messageResponse
    })
  })
}



