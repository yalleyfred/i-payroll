import { app } from "./app";
import dotenv from "dotenv";
import { DB } from "./Database";

dotenv.config();

const port = process.env.PORT;

DB();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
