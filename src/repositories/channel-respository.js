import CrudRepository from './crud-repository.js';
import Channel from '../models/channel-model.js';

class ChannelRepository extends CrudRepository {
  constructor() {
    super(Channel);
  }
}

export default ChannelRepository;
