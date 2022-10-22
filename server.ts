import { app } from "./app";
import dotenv from "dotenv";
import { DB } from "./Database";
import swaggerDocs from './utils/swagger';

dotenv.config();

const port = Number(process.env.PORT);

DB();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

  swaggerDocs(app, port);
});
