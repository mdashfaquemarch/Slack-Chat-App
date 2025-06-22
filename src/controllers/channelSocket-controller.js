import { JOIN_CHANNEL } from "../utils/common/event-constants.js";


export default function messageHandler(io, socket) {
   socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb) {
      const roomId = data.channelId;
      socket.join(roomId);
      cb({
         success: true,
         message: "Successfully joined the channel",
         data: roomId
      })
   })
}