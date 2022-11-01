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
exports.makePayroll = exports.makePayslip = void 0;
const payslipModel_1 = __importStar(require("../model/payslipModel"));
const employeeModel_1 = __importStar(require("../model/employeeModel"));
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const paySchemeModel_1 = __importStar(require("../model/paySchemeModel"));
const loanModel_1 = __importStar(require("../model/loanModel"));
const Database_1 = require("../Database");
const payUtil_1 = require("../utils/payUtil");
const payslip_1 = require("../utils/payslip");
const email_1 = require("../utils/email");
const makePayslip = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, payrollModel_1.PayrollMap)(Database_1.Database);
        (0, payslipModel_1.PayslipMap)(Database_1.Database);
        (0, employeeModel_1.EmployeeMap)(Database_1.Database);
        const out = yield (0, payslip_1.slip)(employee);
        const output = out.output;
        const empPayroll = out.empPayroll;
        const emp = out.emp;
        const snnit_deduction = empPayroll.teir_one + empPayroll.teir_two;
        const newPayslip = {
            name: empPayroll.name,
            job_title: empPayroll.job_title,
            email: empPayroll.email,
            allowance: empPayroll.allowance,
            basic_wage: empPayroll.basic_wage,
            date: empPayroll.date,
            bonus: empPayroll.bonus,
            income_tax: empPayroll.income_tax,
            bonus_tax: empPayroll.bonus_tax,
            snnit_deduction: snnit_deduction,
            loan_deduction: empPayroll.loan_deduction,
            total_deduction: empPayroll.total_deduction,
            net_salary: empPayroll.net_salary,
        };
        const payslip = yield payslipModel_1.default.findAll({
            where: {
                name: employee.name,
                date: employee.date,
            },
        });
        for (let i = 0; i < payslip.length; i++) {
            const mnt = payslip[i].date.toString().slice(0, 7);
            console.log(mnt);
            if (mnt == employee.date) {
                throw new Error("this payslip already exist");
            }
        }
        yield payslipModel_1.default.create(newPayslip);
        yield (0, email_1.sendEmail)({
            email: newPayslip.email,
            subject: "ipayroll",
            message: output,
        });
        return { newPayslip: newPayslip };
    }
    catch (error) {
        throw error;
    }
});
exports.makePayslip = makePayslip;
function makePayroll(employee) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, paySchemeModel_1.PayMap)(Database_1.Database);
            (0, payrollModel_1.PayrollMap)(Database_1.Database);
            (0, employeeModel_1.EmployeeMap)(Database_1.Database);
            (0, loanModel_1.LoanMap)(Database_1.Database);
            const empDetails = {
                name: employee.name,
                month_year: employee.month_year,
            };
            if (!employee.name || !employee.month_year) {
                throw new Error("Please provide employee name and date of payment");
            }
            const payDate = empDetails.month_year.toString();
            const emp = yield employeeModel_1.default.findOne({
                where: {
                    name: employee.name,
                },
            });
            if (emp == null) {
                throw new Error("Employee does not exist");
            }
            if (emp.hire_date.toString().slice(2, 7) > payDate.slice(2, 7)) {
                throw new Error("You can not pay an employee before the hire date");
            }
            const employeeEmail = emp === null || emp === void 0 ? void 0 : emp.email;
            const employeeJobtitle = emp === null || emp === void 0 ? void 0 : emp.job_title;
            const empLoan = yield loanModel_1.default.findOne({
                where: {
                    name: emp === null || emp === void 0 ? void 0 : emp.name,
                },
            });
            const loanAmt = empLoan === null || empLoan === void 0 ? void 0 : empLoan.amount;
            const loanToPay = (0, payUtil_1.loan)(loanAmt);
            let l1 = yield paySchemeModel_1.default.findOne({
                where: {
                    job_title: "level 1",
                },
            });
            let lvl_one = l1 === null || l1 === void 0 ? void 0 : l1.job_title;
            let L2 = yield paySchemeModel_1.default.findOne({
                where: {
                    job_title: "level 2",
                },
            });
            let lvl_two = L2 === null || L2 === void 0 ? void 0 : L2.job_title;
            let L3 = yield paySchemeModel_1.default.findOne({
                where: {
                    job_title: "level 3",
                },
            });
            let lvl_three = L3 === null || L3 === void 0 ? void 0 : L3.job_title;
            let jAssociate = yield paySchemeModel_1.default.findOne({
                where: {
                    job_title: "Junior Associate",
                },
            });
            let jnr_Associate = jAssociate === null || jAssociate === void 0 ? void 0 : jAssociate.job_title;
            let sAssociate = yield paySchemeModel_1.default.findOne({
                where: {
                    job_title: "Senior Associate",
                },
            });
            let snr_Associate = sAssociate === null || sAssociate === void 0 ? void 0 : sAssociate.job_title;
            if (employeeJobtitle == lvl_one ||
                employeeJobtitle == lvl_two ||
                employeeJobtitle == lvl_three ||
                employeeJobtitle == jnr_Associate ||
                employeeJobtitle == snr_Associate) {
                const empPay = yield payrollModel_1.default.findAll({
                    where: {
                        name: employee.name,
                    },
                });
                for (let i = 0; i < empPay.length; i++) {
                    const mnt = empPay[i].date.toString().slice(0, 7);
                    if (mnt == payDate) {
                        throw new Error("this payroll has been created already");
                    }
                }
                let newPay = yield paySchemeModel_1.default.findOne({
                    where: {
                        job_title: employeeJobtitle,
                    },
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
                const grossSalary = myObj.basic + myObj.allowance + myObj.bonus;
                const taxableIncome = grossSalary - TaxRelief;
                const income_tax = (0, payUtil_1.incomeTax)(taxableIncome);
                const bonus_tax = (0, payUtil_1.bonusTax)(TCE, myObj.bonus, taxableIncome);
                const totalDeduction = teir_one + teir_two + income_tax + bonus_tax;
                const netSalary = grossSalary - totalDeduction;
                const payrollData = {
                    job_title: employeeJobtitle,
                    name: empDetails.name,
                    email: employeeEmail,
                    date: empDetails.month_year,
                    basic_wage: myObj.basic,
                    allowance: myObj.allowance,
                    bonus: myObj.bonus,
                    teir_one: teir_one,
                    teir_two: teir_two,
                    income_tax: income_tax,
                    bonus_tax: bonus_tax,
                    loan_deduction: loanToPay,
                    total_deduction: totalDeduction,
                    net_salary: netSalary,
                };
                yield payrollModel_1.default.create(payrollData);
                return { payrollData: payrollData };
            }
            throw new Error("Job title does not exit in the firm");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.makePayroll = makePayroll;
//# sourceMappingURL=payService.js.map