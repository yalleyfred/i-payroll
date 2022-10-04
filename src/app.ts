import express, { Express, Request, Response, Router } from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { port } from './config';
import cors from 'cors';

// import userRoute from './routes/userRoute';
// import employeeRoute from './routes/employeesRoute';
// import payslipRoute from './routes/payslipRoute';
// import payRoute from './routes/payRoute';
// import payrollRoute from './routes/payrollRoute';
// import sequelize from './Database';

dotenv.config();

const app: Express = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


// sequelize.authenticate().then(() => {
//   console.log('connected to database successfully!'); 
// }).catch(err => {
//   console.log('DB connection failed');
  
// })

// app.use('/api/v1/users', userRoute);
// app.use('/api/v1/employees', employeeRoute);
// app.use('/api/v1/payslip', payslipRoute);
// app.use('/api/v1/pay', payRoute);
// app.use('/api/v1/payroll', payrollRoute);



app.listen(port || 3001, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});

