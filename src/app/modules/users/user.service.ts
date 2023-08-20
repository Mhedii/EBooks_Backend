import httpStatus from 'http-status';

import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!createUser) {
    // throw new ApiError(false, 'Failed to create User');
    console.log('Failed to create User');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
