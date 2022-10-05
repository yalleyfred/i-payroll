"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
// import userRoute from './routes/userRoute';
// import employeeRoute from './routes/employeesRoute';
// import payslipRoute from './routes/payslipRoute';
// import payRoute from './routes/payRoute';
// import payrollRoute from './routes/payrollRoute';
// import sequelize from './Database';
dotenv.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// sequelize.authenticate().then(() => {
//   console.log('connected to database successfully!'); 
// }).catch(err => {
//   console.log('DB connection failed');
// })
// app.use('/api/v1/users', userRoute);
// app.use('/api/v1/employees', employeeRoute);
// app.use('/api/v1/payslip', payslipRoute);
// app.use('/api/v1/pay', payRoute);
// app.use('/api/v1/payroll', payrollRoute);
app.listen(config_1.port || 3001, () => {
    console.log(`⚡️[server]: Server is running at ${config_1.port}`);
});
//# sourceMappingURL=app.js.map