import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors"
import session from 'express-session';
import {session_secret} from './config'

dotenv.config();

export const app: Express = express();

import employeeRoute from './routes/employeeRoute';
import userRoute from './routes/userRoute';
import paySchemeRoute from './routes/paySchemeRoute';
import payrollRoute from './routes/payrollRoute';
import payslipRoute from './routes/payslipRoute';
import loanRoute from './routes/loanRoute';





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(session({
//   secret: session_secret,
//   resave: true,
//   saveUninitialized: false,
//   cookie: {maxAge: 3000}
//   ));




app.use('/api/v1/employees', employeeRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/payScheme', paySchemeRoute);
app.use('/api/v1/payroll', payrollRoute);
app.use('/api/v1/payslip', payslipRoute);
app.use('/api/v1/loan', loanRoute);
