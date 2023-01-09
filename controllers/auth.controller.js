import { AuthService } from "../services/auth.service.js";
import { createAccessToken } from "../const/jwt.const.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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

      if (user && accessToken) return null;

      res.sendStatus(204);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 5. Find user by id
  static async findUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await AuthService.findUserById(userId);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
  // 6. Forgot password
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      //* samo 200 nemora da znae userot dali postoi takov email
      if (!user) return res.sendStatus(200);

      const secretToken = uuidv4();
      await User.updateOne({
        token: secretToken,
      });

      const link = `http://localhost:4200/auth/reset-password/${secretToken}`;

      //! nodemailer
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gymtrackermk@gmail.com",
          pass: "ykivnbfkjvwiurko",
        },
      });

      let mailOptions = {
        from: "gymtrackermk@gmail.com",
        to: "aleksandarichev@proton.me",
        subject: "Password reset",
        text:
          "Click on the following link to reset your password \n\n" +
          link +
          "\n\n If this was not you, please skip this and your password will remains unchanged.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response);
        }
      });

      console.log(link);

      res.sendStatus(200);
    } catch (error) {}
  }
  // 7. Change password
  static async resetPassword(req, res) {
    try {
      const { password, token } = req.body;

      if (!token) {
        return res.json({ message: "Token is not valid" });
      }

      const hashedPassword = await bcrypt.hash(password.password, 8);

      await User.updateOne({
        password: hashedPassword,
        token: null,
      });

      res.status(200).send({
        message: "Password updated",
      });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}
