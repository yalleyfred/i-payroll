import {
  db_host,
  db_port,
  db_name,
  db_user,
  db_password,
  ldb_host,
  ldb_name,
  ldb_password,
  ldb_port,
  ldb_user,
} from "./config";

import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

export const Database = new Sequelize({
  database: db_name,
  username: db_user,
  password: db_password,
  host: db_host,
  port: db_port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

export const LocalDB = new Sequelize({
  database: ldb_name,
  username: ldb_user,
  password: ldb_password,
  host: ldb_host,
  port: ldb_port,
  dialect: "postgres",
});

export const DB = () => {
  if (isProduction) {
    Database.authenticate()
      .then(() => {
        console.log("connected to production database successfully!");
      })
      .catch((error) => {
        console.log("DB connection for production failed");
      });
  } else {
    LocalDB.authenticate()
      .then(() => {
        console.log("connected to local database successfully!");
      })
      .catch((error) => {
        console.log("DB connection for local failed");
      });
  }
};
