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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSnnit = exports.createSnnit = void 0;
const snnitModel_1 = __importStar(require("../model/snnitModel"));
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const employeeModel_1 = __importStar(require("../model/employeeModel"));
const errorUtils_1 = require("../utils/errorUtils");
const Database_1 = require("../Database");
const createSnnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, payrollModel_1.PayrollMap)(Database_1.Database);
        (0, employeeModel_1.EmployeeMap)(Database_1.Database);
        (0, snnitModel_1.SnnitMap)(Database_1.Database);
        const { name, date } = req.body;
        if (!name || !date) {
            throw new Error("Please fill all fields");
        }
        const emp = yield employeeModel_1.default.findOne({
            where: {
                name: name,
            }
        });
        if (!emp) {
            throw new Error("Employee does not exist!");
        }
        const empPayroll = yield payrollModel_1.default.findOne({
            where: {
                name: name,
                date: date
            }
        });
        if (!empPayroll) {
            throw new Error("employee has no payroll record!");
        }
        if ((empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.date) !== date) {
            throw new Error("There is not payroll for this month!");
        }
        const snnit = yield snnitModel_1.default.findAll({
            where: {
                name: name
            }
        });
        for (let i = 0; i < snnit.length; i++) {
            const mnt = snnit[i].date.toString();
            console.log(mnt);
            if (mnt == date) {
                throw new Error("this snnit has been created already");
            }
        }
        const total_snnit_contribution = (empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.teir_one) + (empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.teir_two);
        const empSnnit = {
            name: empPayroll.name,
            basic_salary: empPayroll.basic_wage,
            tier_one: empPayroll.teir_one,
            tier_two: empPayroll.teir_two,
            total_snnit_contribution: total_snnit_contribution,
            snnit_no: emp.snnit,
            date: date
        };
        let result = yield snnitModel_1.default.create(empSnnit);
        res.status(200).json({
            status: "success",
            pay: result,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createSnnit = createSnnit;
const getAllSnnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, snnitModel_1.SnnitMap)(Database_1.Database);
        const result = yield snnitModel_1.default.findAll();
        res.status(200).json({
            status: "success",
            snnit: result,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getAllSnnit = getAllSnnit;
//# sourceMappingURL=snnitCont.js.map