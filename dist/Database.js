"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.LocalDB = exports.Database = void 0;
const config_1 = require("./config");
const sequelize_1 = require("sequelize");
const isProduction = process.env.NODE_ENV === "production";
exports.Database = new sequelize_1.Sequelize({
    database: config_1.db_name,
    username: config_1.db_user,
    password: config_1.db_password,
    host: config_1.db_host,
    port: config_1.db_port,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false,
        },
    },
});
exports.LocalDB = new sequelize_1.Sequelize({
    database: config_1.ldb_name,
    username: config_1.ldb_user,
    password: config_1.ldb_password,
    host: config_1.ldb_host,
    port: config_1.ldb_port,
    dialect: "postgres",
});
const DB = () => {
    if (isProduction) {
        exports.Database.authenticate()
            .then(() => {
            console.log("connected to production database successfully!");
        })
            .catch((error) => {
            console.log("DB connection for production failed");
        });
    }
    else {
        exports.LocalDB.authenticate()
            .then(() => {
            console.log("connected to local database successfully!");
        })
            .catch((error) => {
            console.log("DB connection for local failed");
        });
    }
};
exports.DB = DB;
//# sourceMappingURL=Database.js.map