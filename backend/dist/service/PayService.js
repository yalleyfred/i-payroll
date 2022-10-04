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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayroll = exports.makePayslip = void 0;
const payslipModel_1 = __importStar(require("../model/payslipModel"));
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const payModel_1 = __importStar(require("../model/payModel"));
const Database_1 = __importDefault(require("../Database"));
const payUtil_1 = require("../utils/payUtil");
const makePayslip = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, payrollModel_1.PayrollMap)(Database_1.default);
        (0, payslipModel_1.PayslipMap)(Database_1.default);
        const empName = employee.name;
        const empPayroll = yield payrollModel_1.default.findOne({
            where: {
                name: empName
            }
        });
        if (empName !== (empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.name)) {
            console.log('Employess doesnt exist');
            throw new Error("Employee doesnt exist");
        }
        const snnit_deduction = empPayroll.teir_one + empPayroll.teir_two;
        const loan_deduction = 100;
        const newPayslip = {
            name: empPayroll.name,
            job_title: empPayroll.job_title,
            allowance: empPayroll.allowance,
            basic_wage: empPayroll.basic_wage,
            date: empPayroll.date,
            bonus: empPayroll.bonus,
            income_tax: empPayroll.income_tax,
            bonus_tax: empPayroll.bonus_tax,
            snnit_deduction: snnit_deduction,
            loan_deduction: loan_deduction,
            total_deduction: empPayroll.total_deduction,
            net_salary: empPayroll.net_salary,
        };
        const output = `
                <h1>This is your Payslip for the month</h1>
                <ul>
                    <li>Basic Wage: ${newPayslip.basic_wage}</li>
                    <li>Allowance: ${newPayslip.allowance}</li>
                    <li>Income Tax: ${newPayslip.income_tax}</li>
                    <li>Snnit Deduction: ${snnit_deduction}</li>
                    <li>Other Deduction: ${loan_deduction}</li>
                    <li>Total Deduction: ${newPayslip.total_deduction}</li>
                    <li>Net Wage: ${newPayslip.net_salary}</li>
                </ul>
            
                <p>Have a wonderful month.</p>
                `;
        yield payslipModel_1.default.create(newPayslip);
        return { newPayslip: newPayslip, output: output };
    }
    catch (error) {
        throw error;
    }
});
exports.makePayslip = makePayslip;
function makePayroll(employee) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, payModel_1.PayMap)(Database_1.default);
            (0, payrollModel_1.PayrollMap)(Database_1.default);
            const empDetails = {
                name: employee.name,
                job_title: employee.job_title,
                month_year: employee.month_year
            };
            let SAjobTitle = yield payModel_1.default.findOne({
                where: {
                    job_title: 'Senior Accountant'
                }
            });
            let SAJobT = SAjobTitle === null || SAjobTitle === void 0 ? void 0 : SAjobTitle.job_title;
            let JAjobTitle = yield payModel_1.default.findOne({
                where: {
                    job_title: 'Junior Accountant'
                }
            });
            let JAJobT = JAjobTitle === null || JAjobTitle === void 0 ? void 0 : JAjobTitle.job_title;
            let SAssjobTitle = yield payModel_1.default.findOne({
                where: {
                    job_title: 'Senior Associate'
                }
            });
            let SAssJobT = SAssjobTitle === null || SAssjobTitle === void 0 ? void 0 : SAssjobTitle.job_title;
            if (empDetails.job_title == JAJobT || empDetails.job_title == SAJobT || empDetails.job_title == SAssJobT) {
                let newPay = yield payModel_1.default.findOne({
                    where: {
                        job_title: empDetails.job_title
                    }
                });
                let myObj = {
                    basic: newPay.basic_salary,
                    allowance: newPay.allowance,
                    bonus: newPay.bonus,
                };
                const TCE = myObj.basic + myObj.allowance;
                const teir_one = (0, payUtil_1.tierOne)(myObj.basic);
                const teir_two = (0, payUtil_1.tierTwo)(myObj.basic);
                const TaxRelief = teir_one + teir_two;
                const grossSalary = (myObj.basic + myObj.allowance + myObj.bonus);
                const taxableIncome = grossSalary - TaxRelief;
                const income_tax = (0, payUtil_1.incomeTax)(taxableIncome);
                const bonus_tax = (0, payUtil_1.bonusTax)(TCE, myObj.bonus, taxableIncome);
                const totalDeduction = teir_one + teir_two + income_tax + bonus_tax;
                const netSalary = grossSalary - totalDeduction;
                const payrollData = {
                    job_title: empDetails.job_title,
                    name: empDetails.name,
                    date: empDetails.month_year,
                    basic_wage: myObj.basic,
                    allowance: myObj.allowance,
                    bonus: myObj.bonus,
                    teir_one: teir_one,
                    teir_two: teir_two,
                    income_tax: income_tax,
                    bonus_tax: bonus_tax,
                    loan_deduction: 100,
                    total_deduction: totalDeduction,
                    net_salary: netSalary
                };
                yield payrollModel_1.default.create(payrollData);
                return { payrollData: payrollData };
            }
            console.log('Job title does not exit in the firm');
            throw new Error('Job title does not exit in the firm');
        }
        catch (error) {
            throw error;
        }
    });
}
exports.makePayroll = makePayroll;
//# sourceMappingURL=PayService.js.map