import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utils/errorUtils";
import User, { UserMap } from "../model/userModel";
import * as userServices from "../service/userService";
import { Database } from "../Database";
import * as dotenv from "dotenv";
import { sendEmail } from "../utils/email";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwt_secret } from "../config";
import { createSendToken } from "../utils/createToken";

export const SECRET_KEY: Secret = jwt_secret;

dotenv.config();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    UserMap(Database);
    const result = await User.findAll();
    res.status(200).json({ users: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    UserMap(Database);
    const id = Number(req.params.id);
    const result = await User.findByPk(id);
    res.status(200).json({ user: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userServices.register(req.body);

    res.cookie("jwt", user.token, user.cookie);

    res.status(201).json({
      message: "successfully registered",
      token: user.token,
      data: user.user,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);

    res.cookie("jwt", foundUser.token, foundUser.cookie);

    res.status(200).json({
      message: "Login successful",
      token: foundUser.token,
      cookie: foundUser.cookie,
    });
  } catch (error) {
    return res.status(401).send(getErrorMessage(error));
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = await userServices.forgotPassword(req.body);
    const token = user.resetToken === "secret";
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/resetuserpassword/${token}`;

    const message = `Forgot your password? Please follow this link to set your new password: ${resetURL}\nIf you did'nt forget your password, please ignore this email!`;

    await sendEmail({
      email: req.body.email,
      subject: "ipayroll",
      message: message,
    });
    res.status(200).json({
      message: "Check your email for link to reset your password",
      result: resetURL,
    });
  } catch (error) {
    return res.status(400).send(getErrorMessage(error));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UserMap(Database);

    type T = {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    };

    const newUser: T = req.body;

    if (
      !newUser.oldPassword ||
      !newUser.newPassword ||
      !newUser.confirmPassword
    ) {
      throw new Error("Please provide all fields");
    }

    if (newUser.oldPassword == newUser.newPassword) {
      throw new Error("You cannot use old password, Please set a new password");
    }

    if (newUser.newPassword !== newUser.confirmPassword) {
      throw new Error("password does not match");
    }

    if (newUser.newPassword.length < 6) {
      throw new Error("Password is too short");
    }

    const user = await User.findOne({
      where: {
        active: true,
      },
    });

    const isMatch = await bcrypt.compareSync(
      newUser.oldPassword,
      user!.password
    );

    if (!isMatch) {
      throw new Error("old password is incorrect");
    }

    if (!user || user == null) {
      return new Error("Token is invalid or has expired");
    }

    const salt: number = 10;

    const hashedPassword = await bcrypt.hash(newUser.newPassword, salt);

    await User.update(
      {
        passwordResetExpires: null,
        passwordResetToken: null,
        password: hashedPassword,
        active: false,
      },
      {
        where: {
          email: user.email,
        },
      }
    );

    createSendToken(user);
    next(res.status(200).json({ message: "success" }));
  } catch (error) {
    return res.status(400).send(getErrorMessage(error));
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    UserMap(Database);

    type T = {
      newPassword: string;
      confirmPassword: string;
    };

    const newUser: T = req.body;

    if (!newUser.newPassword || !newUser.confirmPassword) {
      throw new Error("Please provide all fields");
    }

    if (newUser.newPassword.length < 6) {
      throw new Error("Password is too short");
    }
    if (newUser.newPassword !== newUser.confirmPassword) {
      throw new Error("password does not match");
    }

    const user = await User.findOne({
      where: {
        active: true,
      },
    });

    if (!user || user == null) {
      return new Error("Token is invalid or has expired");
    }

    const salt: number = 10;

    const hashedPassword = await bcrypt.hash(newUser.newPassword, salt);

    await User.update(
      {
        passwordResetExpires: null,
        passwordResetToken: null,
        password: hashedPassword,
        active: false,
      },
      {
        where: {
          email: user.email,
        },
      }
    );

    const credentials = createSendToken(user);

    res.send("success");
  } catch (error) {
    return res.status(400).send(getErrorMessage(error));
  }
};
