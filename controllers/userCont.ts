import { NextFunction, Request, Response } from 'express';
import { getErrorMessage } from '../utils/errorUtils';
import User, { UserMap } from '../model/userModel';
import * as userServices from '../service/userService'
import Database from '../Database';
import * as dotenv from 'dotenv';
import {sendEmail} from "../utils/email";
import crypto from 'crypto';
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt  from "bcrypt";
import { jwt_secret } from '../config';
import { createSendToken } from "../utils/createToken";





export const SECRET_KEY: Secret = jwt_secret;



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
      const user = await userServices.register(req.body);
      console.log(req.body);
      
      res.cookie('jwt', user.token, user.cookie);
      
      
      res.status(200).json({
        message: 'User created',
        token: user.token,
        data: user.user
      });
      
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }

export const logIn = async(req:Request, res: Response) => {
    try {

      const foundUser = await userServices.login(req.body);
      
      
      res.cookie('jwt', foundUser.token, foundUser.cookie);
       
      res.status(200).json({
        status: 'success',
        token: foundUser.token,
        cookie: foundUser.cookie
      });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }

}

export const forgotPassword = async(req:Request, res: Response) => {
    try {
      const user = await userServices.forgotPassword(req.body);
      console.log(user);
      
  
      const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${user?.resetToken}`;

        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did'nt forget your password, please ignore this email!`;

       await sendEmail({
        email: req.body.email,
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
  try {

    UserMap(Database);
  const passwordToken: string = req.params.token;
  console.log(passwordToken);

  const {oldPassword, newPassword, confirmPassword}: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string
  } = req.body;
  
  // const hashedToken = crypto
  // .createHash('sha256')
  // .update(passwordToken)
  // .digest('hex');
  // console.log(hashedToken);
  

  const user = await User.findOne({
    where: {
      passwordResetToken: passwordToken
     
    }
  })
 
  console.log(user?.password);
  const isMatch = await bcrypt.compareSync(oldPassword, user.password);
  console.log(isMatch);
  
  if(!isMatch) {
    throw new Error("old password is not correct");
  }

  if(oldPassword == newPassword) {
    throw new Error("you can not use old password, Please set new password");
  }

  if(newPassword == confirmPassword) {
    throw new Error("password does not match");
  }
  
  if((!user) || user == null) {
    res.send("oops")
    return new Error('Token is invalid or has expired');
    
  };

  const salt: number = 10
  console.log(newPassword);
  
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  console.log(hashedPassword);

 await User.update({
    passwordResetExpires: null,
    passwordResetToken: null,
    password: hashedPassword
  }, {
    where: {
      email: user.email
    }
  }); 


  const credentials = createSendToken(user)
         console.log(credentials);
          
        next(res.send("success"));

  }catch (error) {
    return res.status(500).send(getErrorMessage(error));
  };
}
