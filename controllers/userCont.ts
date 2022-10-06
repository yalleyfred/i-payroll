import { NextFunction, Request, Response } from 'express';
import { getErrorMessage } from '../utils/errorUtils';
import User, { UserMap } from '../model/userModel';
import * as userServices from '../service/userService'
import Database from '../Database';
import * as dotenv from 'dotenv';
import {sendEmail} from "../utils/email";
import crypto from 'crypto';
import jwt, {Secret} from 'jsonwebtoken';



export const SECRET_KEY: Secret = "howcanyoutellmethisstory";



dotenv.config();



export const getAllUsers = async (req: Request, res: Response) => {
    try {
      UserMap(Database);
    const result = await User.findAll();
    res.status(200).json({ users: result });
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }

export const getUser = async (req: Request, res: Response) => {
    try {
      UserMap(Database);
    const id = Number(req.params.id);
    const result = await User.findByPk(id);
    res.status(200).json({ user: result });
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }


export const register = async (req: Request, res: Response) => {
    try {
      await userServices.register(req.body);
      console.log(req.body);
      
      res.status(200).send('Inserted successfully');
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }

export const logIn = async(req:Request, res: Response) => {
    try {
      const foundUser = await userServices.login(req.body);
      console.log(foundUser);
      const cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
            ),
        secure: true,
        httpOnly: true
        };
        if(process.env.NODE_ENV ==='production') cookieOptions.secure = true;
        res.cookie('jwt', foundUser.token, cookieOptions);
      res.status(200).send(foundUser);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }

}

export const forgotPassword = async(req:Request, res: Response) => {
    try {
      const user = await userServices.forgotPassword(req.body);

  
      const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${user?.resetToken}`;

        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did'nt forget your password, please ignore this email!`;

       await sendEmail({
        email: "yalleyfred@gmail.com",
        subject: "ipayroll",
        text: 'Your password reset token (valid for 10 min)',
        message: message
       })
        res.status(200).json({
          status: 'success',
          result: resetURL
        })
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
}

export const resetPassword = async(req:Request, res: Response, next: NextFunction) => {
  UserMap(Database);
  const passwordToken: string = req.params.token;
  console.log(passwordToken);
  
  const hashedToken = crypto
  .createHash('sha256')
  .update(passwordToken)
  .digest('hex');
  console.log(hashedToken);
  
  const user = await User.findOne({
    where: {
      passwordResetToken: passwordToken
     
    }
  })
  console.log(user);
  // const myUser: {
  //   email: string | null;
  //   password: string | null;
  //   passwordResetToken: string | null;
  //   passwordResetExpires: string | null;
  // } = user;
  if((!user) || user == null) {
    res.send("oops")
    return new Error('Token is invalid or has expired');
    
  };
  // user.password = req.body.password;
  // user.passwordResetToken = null;
  // user.passwordResetExpires = null;

  const token = jwt.sign({id: user.id, email:user.email}, SECRET_KEY, {
                expiresIn: "1h",
              });
          
              next();
}
