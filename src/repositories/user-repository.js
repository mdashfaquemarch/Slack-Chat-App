import CrudRepository from './crud-repository.js'
import User from '../models/user-model.js'

class UserRepository extends CrudRepository {

    constructor() {
        super(User);
    }

}

export default UserRepository;