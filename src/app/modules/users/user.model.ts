import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

export const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true },
);
userSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    email: this.email,
  });
  if (isExist) {
    // throw new ApiError(false, 'Email is Already exist');
    console.log('Email is Already exist');
  }
  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
