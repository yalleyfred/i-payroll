"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("./Database"));
dotenv_1.default.config();
const port = process.env.PORT;
Database_1.default.authenticate().then(() => {
    console.log('connected to database successfully!');
}).catch(err => {
    console.log('DB connection failed');
});
app_1.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map