import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = "howcanyoutellmethisstory";

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token);
        
        // let token:string = '';
        //     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //         token = req.headers.authorization.split(' ')[1];
        //     }
        //     console.log(token);
            
      if (!token) {
        throw new Error("Nope");
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;

      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
};