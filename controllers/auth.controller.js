import { AuthService } from "../services/auth.service.js";
import { createAccessToken, createRefreshToken } from "../const/jwt.const.js";

export class AuthController {
  // 1. Register user
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      await AuthService.registerUser(userData);

      res.status(201).send({ message: "Account created successfully!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 2. Login user
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.loginUser(email, password);

      const token = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);

      await AuthService.saveRefreshToken(user, refreshToken);

      res.status(200).send({
        ...user.toJSON(),
        token,
        refreshToken,
        message: "Logged in successfully!",
      });
    } catch (error) {
      res.status(401).send(error);
    }
  }
  // 3. Refresh access token
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      const user = await AuthService.validateRefreshToken(refreshToken);

      await AuthService.deleteRefreshToken(user, refreshToken);

      const token = createAccessToken(user._id);
      const newRefreshToken = createRefreshToken(user._id);

      await AuthService.saveRefreshToken(user, newRefreshToken);

      return res.status(200).send({ token, newRefreshToken });
    } catch (error) {
      res.sendStatus(403);
    }
  }
  // 4. Logout user
  static async logoutUser(req, res) {
    try {
      const user = req.user;
      const refreshToken = req.body.refreshToken;

      await AuthService.deleteRefreshToken(user, refreshToken);

      res.sendStatus(204);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 5. Logout all
  static async logoutAll(req, res) {
    try {
      const user = req.user;

      await AuthService.deleteAllRefreshTokens(user);

      res.sendStatus(204);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 6. Find user by id
  static async findUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await AuthService.findUserById(userId);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
