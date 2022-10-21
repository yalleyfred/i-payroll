import jwt, { Secret } from "jsonwebtoken";
import { jwt_secret, jwt_expires_in } from "../config";
import User from "../model/userModel";

export const SECRET_KEY: Secret = jwt_secret;

const signToken = (id: number | undefined) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: jwt_expires_in,
  });
};

export const createSendToken = (user: User) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  return { token: token, cookieOptions: cookieOptions };
};
