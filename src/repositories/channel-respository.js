import CrudRepository from './crud-repository.js';
import Channel from '../models/channel-model.js';

class ChannelRepository extends CrudRepository {
  constructor() {
    super(Channel);
  }

  async getChannelWithWorkspaceDetails(channelId) {
      const channel = await Channel.findById(channelId)
      .populate("workspaceId");
      return channel;
  }
}

export default ChannelRepository;
