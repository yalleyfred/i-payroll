import { db_host, db_port, db_name, db_user, db_password, db_url } from './config';

import { Sequelize } from 'sequelize';
import { rejects } from 'assert';

const isProduction = process.env.NODE_ENV === 'production';
// const db_url = process.env.DATABASE_URL
// postgres://jveqjcaycltydv:f8c05612bceb06eeb28ba93f7b7ea417c134b4fcd2087a782a1e7837f222932d@ec2-54-91-223-99.compute-1.amazonaws.com:5432/dca5mpfr89k2s5
// export const prodDB = new Sequelize(`postgresql://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`);
// export const prodDB = new Sequelize(db_url, ssl: {
//   rejectUnauthorized: false
// });
const connectionString = `postgresql://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`;

export default new Sequelize({
  database: db_name,
  username: db_user,
  password: db_password,
  host: db_host,
  port: db_port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  },
});

// if(process.env.NODE_ENV === 'production') {
//   prodDB;
//   console.log(prodDB);
  
// } 



//  export default new Sequelize({
//   dialect: "postgres",
//   host: db_host,
//   port: db_port,
//   database: db_name,
//   username: db_user,
//   password: db_password
// });

// const prodConfig = {
//   connectionString: process.env.DATABASE_URL
// }

// const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig);
