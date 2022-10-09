import User, {UserMap} from "../model/userModel";
import Database from "../Database";
import bcrypt  from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../config';
import { createSendToken } from "../utils/createToken";



import {createPasswordResetToken} from "../utils/resetToken";

export const SECRET_KEY: Secret = jwt_secret;


type U = {
    id: number;
    name: string;
    email: string;
    password: string;
    password2: string;
  }

  type loginU = {
    email: string;
    password: string;
  }

  type E = {
    email: string;
    }



export async function register(user: U) {
    try {
        UserMap(Database);
    
        let newUser: U = user;
        const username = await User.findOne({
            where: {
              email: newUser.email
            }
          });
      
          if (newUser.email == username?.email) {
            console.log('You are already a user.');
            throw new Error("You are already a user.")
          }else {

            const salt: number = 10
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
      
            const user: {
                id: number;
              name: string;
              email: string;
              password: string;
            } = {
                id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              password: hashedPassword
            }
        
            
             const registeredUser = await User.create(user);
            
             
             const userCredentials = createSendToken(registeredUser);
             console.log(userCredentials.token);
             
             
             
              return {user: registeredUser, token: userCredentials.token, cookie: userCredentials.cookieOptions}
          }
    
    } catch (error) {
      throw error;
    }
}

export async function login(user: loginU) {
    try {
        UserMap(Database);
      const foundUser = await User.findOne({ where: {
        email: user.email
      }});
      
      
      if (!foundUser) {
        throw new Error('Email of user is not correct');
      }
   
      const isMatch = bcrypt.compareSync(user.password, foundUser?.password);
   
      if (isMatch) {
        const userCredentials = createSendToken(foundUser);
          
          return { user: foundUser, token: userCredentials.token, cookie: userCredentials.cookieOptions };
      } else {
        throw new Error('Password is not correct');
      }
      
    } catch (error) {
      throw error;
    }
}



export async function forgotPassword(user: E) {
   try {
    UserMap(Database);

    const theUser = await User.findOne({
        where: {
            email: user.email
        }
    })
    console.log(theUser?.passwordResetExpires);
    
    if(!theUser) {
        console.log('There is no user with that mail');
        throw new Error('There is no user with that mail');
    }
    const reset: {
      resetToken: string;
      passwordResetToken: string;
      passwordResetExpires: number;
    } = createPasswordResetToken()

    console.log(reset);

    await User.update({
      passwordResetToken: reset.passwordResetToken,
      passwordResetExpires: reset.passwordResetExpires
    }, {
      where: {
        email: user.email
      }
    }); 
   
    console.log(theUser?.passwordResetToken);
    
    return {email: theUser.email, resetToken: reset.passwordResetToken};

   }catch (error) {
    throw error;
   }
}



