"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = require("./Database");
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
const port = Number(process.env.PORT);
(0, Database_1.DB)();
app_1.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    (0, swagger_1.default)(app_1.app, port);
});
//# sourceMappingURL=server.js.map