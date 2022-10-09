"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const employeeRoute_1 = __importDefault(require("./routes/employeeRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)());
// app.use(session({
//   secret: session_secret,
//   resave: true,
//   saveUninitialized: false,
//   cookie: {maxAge: 3000}
//   ));
exports.app.use('/api/v1/employees', employeeRoute_1.default);
exports.app.use('/api/v1/users', userRoute_1.default);
//# sourceMappingURL=app.js.map