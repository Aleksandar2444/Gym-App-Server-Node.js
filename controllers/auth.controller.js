import { config } from "dotenv";
config();
import {
  registerUserService,
  loginUserService,
  logoutUserService,
  findUserByIdService,
} from "../services/auth.service.js";
import { createAccessToken } from "../const/jwt.const.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {
  GAf_000005,
  GAf_000006,
  GAs_000001,
  GAs_000002,
  GAs_000003,
} from "../errors/error.codes.js";

const { GYM_USER, GYM_PASSWORD, DOMEN_URL } = process.env;

// 1. Register user
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    try {
      await registerUserService(userData);

      res.status(201).send({ message: `${GAs_000001}` });
    } catch (error) {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// 2. Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      const user = await loginUserService(email, password);

      const token = createAccessToken(user._id);

      res.status(200).send({
        user: user.toJSON(),
        userLoggedInToken: token,
        message: `${GAs_000002}`,
      });
    } catch (error) {
      res.status(401).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// 3. Logout user
export const logoutUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) return res.sendStatus(403);

    try {
      await logoutUserService(userId);

      req.user = null;

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// 4. Find user by id
export const findUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await findUserByIdService(userId);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
// 5. Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.sendStatus(403);

    const user = await User.findOne({ email: email });
    if (!user) return res.sendStatus(400);

    const resetPasswordToken = uuidv4();

    await User.updateOne(user, { resetPasswordToken: resetPasswordToken });

    const link = `${DOMEN_URL}/auth/reset-password/${resetPasswordToken}`;

    //! nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${GYM_USER}`,
        pass: `${GYM_PASSWORD}`,
      },
    });

    let mailOptions = {
      from: `${GYM_USER}`,
      to: `${user.email}`,
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

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: `${GAf_000005}` });
  }
};
// 6. Change password
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.sendStatus(400);

    const resetPasswordToken = req.params;
    if (!resetPasswordToken) return res.sendStatus(404);

    const user = await User.findOne(resetPasswordToken);

    const hashedPassword = await bcrypt.hash(password.password, 8);

    await User.updateOne(user, {
      password: hashedPassword,
      resetPasswordToken: null,
    });

    res.status(200).send({ message: `${GAs_000003}` });
  } catch (error) {
    res.status(500).send({ message: `${GAf_000006}` });
  }
};
