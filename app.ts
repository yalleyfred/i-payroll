import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors"

dotenv.config();

export const app: Express = express();

import employeeRoute from './routes/employeeRoute';
import userRoute from './routes/userRoute';



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/employees', employeeRoute);
app.use('/api/v1/users', userRoute);
