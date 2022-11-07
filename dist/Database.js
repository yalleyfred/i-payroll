"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const sequelize_1 = require("sequelize");
const isProduction = process.env.NODE_ENV === 'production';
// const db_url = process.env.DATABASE_URL
// postgres://jveqjcaycltydv:f8c05612bceb06eeb28ba93f7b7ea417c134b4fcd2087a782a1e7837f222932d@ec2-54-91-223-99.compute-1.amazonaws.com:5432/dca5mpfr89k2s5
// export const prodDB = new Sequelize(`postgresql://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`);
// export const prodDB = new Sequelize(db_url, ssl: {
//   rejectUnauthorized: false
// });
const connectionString = `postgresql://${config_1.db_user}:${config_1.db_password}@${config_1.db_host}:${config_1.db_port}/${config_1.db_name}`;
exports.default = new sequelize_1.Sequelize({
    database: config_1.db_name,
    username: config_1.db_user,
    password: config_1.db_password,
    host: config_1.db_host,
    port: config_1.db_port,
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
//# sourceMappingURL=Database.js.map