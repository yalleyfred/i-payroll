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
exports.getAllTax = exports.createTax = void 0;
const taxModel_1 = __importStar(require("../model/taxModel"));
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const employeeModel_1 = __importStar(require("../model/employeeModel"));
const errorUtils_1 = require("../utils/errorUtils");
const Database_1 = require("../Database");
const createTax = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, payrollModel_1.PayrollMap)(Database_1.Database);
        (0, employeeModel_1.EmployeeMap)(Database_1.Database);
        (0, taxModel_1.TaxMap)(Database_1.Database);
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
        console.log(empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.date);
        if (!empPayroll) {
            throw new Error("employee has no payroll record!");
        }
        const payDate = empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.date.toString().slice(0, 7);
        if (payDate !== date) {
            throw new Error("There is no payroll for this month!");
        }
        const taxes = yield taxModel_1.default.findAll({
            where: {
                name: name
            }
        });
        for (let i = 0; i < taxes.length; i++) {
            const mnt = taxes[i].date.toString().slice(0, 7);
            console.log(mnt);
            if (mnt == date) {
                throw new Error("this tax has been created already");
            }
        }
        const relief = (empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.teir_one) + (empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.teir_two);
        const net_taxable_pay = empPayroll.basic_wage - relief;
        const empTax = {
            name: empPayroll.name,
            basic_salary: empPayroll.basic_wage,
            tax_relief: relief,
            net_taxable_pay: net_taxable_pay,
            total_tax_deduction: empPayroll.income_tax,
            tin: emp.tin,
            date: date
        };
        let result = yield taxModel_1.default.create(empTax);
        res.status(200).json({
            message: "success",
            pay: result,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createTax = createTax;
const getAllTax = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, taxModel_1.TaxMap)(Database_1.Database);
        const result = yield taxModel_1.default.findAll();
        res.status(200).json({
            status: "success",
            tax: result,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getAllTax = getAllTax;
//# sourceMappingURL=taxCont.js.map