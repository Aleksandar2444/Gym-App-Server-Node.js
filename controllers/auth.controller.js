import { AuthService } from "../services/auth.service.js";
import { createAccessToken } from "../const/jwt.const.js";

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

      res.status(200).send({
        ...user.toJSON(),
        token,
        message: "Logged in successfully!",
      });
    } catch (error) {
      res.status(401).send(error);
    }
  }
  // 3. Refresh access token
  static async accessToken(req, res) {
    try {
      const accessToken = req.body.token;
      const user = await AuthService.validateAccessToken(accessToken);

      const token = createAccessToken(user._id);

      return res.status(200).send({ token });
    } catch (error) {
      res.sendStatus(403);
    }
  }
  // 4. Logout user
  static async logoutUser(req, res) {
    try {
      const user = req.user;
      const accessToken = req.body.token;

      user = null;
      accessToken = null;

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
