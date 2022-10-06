import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();

export const app: Express = express();

import employeeRoute from './routes/employeeRoute';



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/employees', employeeRoute);
