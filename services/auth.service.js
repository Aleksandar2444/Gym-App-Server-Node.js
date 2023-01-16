import { GAf_000003, GAf_000004 } from "../errors/error.codes.js";
import { User } from "../models/user.model.js";

// 1. Register user
export const registerUserService = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
  } catch (error) {
    throw error;
  }
};
// 2. Login user
export const loginUserService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw `${GAf_000003}`;

    const isPasswordValid = await user.comparePasswords(password);
    if (!isPasswordValid) throw `${GAf_000003}`;

    return user;
  } catch (error) {
    throw error;
  }
};
// 3. Logout user
export const logoutUserService = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw `${GAf_000004}`;

    return user;
  } catch (error) {
    throw error;
  }
};
// 4. Find user by id
export const findUserByIdService = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw `${GAf_000004}`;

    return user;
  } catch (error) {
    throw error;
  }
};
