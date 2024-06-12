import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  console.log(newUser.toJSON());
  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
