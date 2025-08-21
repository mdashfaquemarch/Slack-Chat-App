import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/user-repository.js';
import { createJWT } from '../utils/common/jwt.js';
import AppError from '../utils/errors/app-error.js';

const userRepo = new UserRepository();

async function signUpService(data) {
  try {
    const newUser = await userRepo.create(data);
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function signInService(data) {
  try {
    const user = await userRepo.getByEmail(data.email);
    if (!user) {
      throw new AppError(
        'user with this email not found',
        StatusCodes.NOT_FOUND
      );
    }

    const isPasswordValid = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Password is Invalid', StatusCodes.BAD_REQUEST);
    }

    const token = createJWT({ id: user._id, email: user.email });

    const loggedInUser = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      token: token
    };

    return loggedInUser;
  } catch (error) {
    throw error;
  }
}

export { signInService, signUpService };
