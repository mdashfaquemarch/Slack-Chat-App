import User from '../models/user-model.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async getByUsername(username) {
    const user = await User.findOne({ username }).select('-password');
    return user;
  }
}

export default UserRepository;
