import {app} from "./app"
import dotenv from 'dotenv';
import sequelize from './Database';

dotenv.config();

const port = process.env.PORT;


sequelize.authenticate().then(() => {
    console.log('connected to database successfully!'); 
  }).catch(error => {
    console.log('DB connection failed');
    
  })

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });