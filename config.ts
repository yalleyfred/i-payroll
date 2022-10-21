import * as dotenv from "dotenv";

dotenv.config({
  path: "${__dirname}/../.env",
});
export const port = Number(process.env.API_PORT);

export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);
export const NODE_ENV = String(process.env.NODE_ENV);

export const ldb_host = String(process.env.LDB_HOST);
export const ldb_port = Number(process.env.LDB_PORT);
export const ldb_name = String(process.env.LDB_NAME);
export const ldb_user = String(process.env.LDB_USER);
export const ldb_password = String(process.env.LDB_PASSWORD);

export const db_url = String(process.env.DATABASE_URL);

export const jwt_expires_in = String(process.env.JWT_EXPIRES_IN);
export const jwt_secret = String(process.env.JWT_SECRET);
