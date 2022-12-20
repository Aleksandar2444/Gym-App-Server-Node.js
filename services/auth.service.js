import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../const/jwt.const.js";

export class AuthService {
  // 1. Register user
  static async registerUser(userData) {
    try {
      const user = new User(userData);

      await user.save();
    } catch (error) {
      throw error;
    }
  }
  // 2. Login user
  static async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw "Invalid Credentials";

      const isPasswordValid = await user.comparePasswords(password);
      if (!isPasswordValid) throw "Invalid Credentials";

      return user;
    } catch (error) {
      throw error;
    }
  }

  // 3. Validate token
  static async validateAccessToken(token) {
    try {
      const { userId } = verifyAccessToken(token);
      const foundUser = await User.findById(userId);

      if (!foundUser) throw new Error();

      return foundUser;
    } catch (error) {
      throw error;
    }
  }

  // 7. Find user by id
  static async findUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) throw "User not found";

      return user;
    } catch (error) {
      throw error;
    }
  }
}
