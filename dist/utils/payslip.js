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
exports.slip = void 0;
const employeeModel_1 = __importStar(require("../model/employeeModel"));
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const Database_1 = require("../Database");
const slip = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    (0, employeeModel_1.EmployeeMap)(Database_1.Database);
    (0, payrollModel_1.PayrollMap)(Database_1.Database);
    const empPayroll = yield payrollModel_1.default.findOne({
        where: {
            name: employee.name,
        },
    });
    const emp = yield employeeModel_1.default.findOne({
        where: {
            name: employee.name,
        },
    });
    const snnit_deduction = empPayroll.teir_one + empPayroll.teir_two;
    const earning = empPayroll.basic_wage + empPayroll.allowance + empPayroll.bonus;
    const output = `
    <style>
    table tr td {
    padding: 10px;
    text-align: left;
    }
    
    table tr td:first-child {
    width: auto;
    }
    
    table tr td:nth-child(2) {
    width: 1px;
    }
    
    table {
    margin: 10px auto;
    width: 50%;
    }
    
    table thead th:first-child {
    text-align: left;
    }
    
    table thead th:nth-child(2) {
    padding-right: 20px;
    }
    
    table tr td:nth-child(2) {
    padding-right: 20px;
    text-align: right;
    }
    
    table thead th {
    padding: 20px 0;
    border-bottom: 2px solid #000;
    border-top: 2px solid #000;
    }
    
    #deductions {
    border-left: 3px solid #000;
    }
    
    body,
    table {
    font-family: 'Inter', sans-serif;
    }
    </style>
    
    <body style="background-color: #fff">
    <section style="margin:80px; width: 90%; background-color: #fff;">
    <h1 style="font-size: 60px; text-align:center; margin-bottom: 0;">Employee Payslip</h1>
    <h6 style="text-align: center; margin-top: 0; font-size: 18px;">For The Period Of <span>{Date Here}</span>
    </h6>
    <!-- <hr /> -->
    <section>
    <div style="display: flex; border-top: 2px solid #000;">
    <table>
        <tr>
            <td>Employee No.</td>
            <td>:</td>
            <td>${emp === null || emp === void 0 ? void 0 : emp.id}</td>
        </tr>
        <tr>
            <td>Department</td>
            <td>:</td>
            <td>${emp === null || emp === void 0 ? void 0 : emp.department}</td>
        </tr>
        <tr>
            <td>Date Hired</td>
            <td>:</td>
            <td>${emp === null || emp === void 0 ? void 0 : emp.hire_date}</td>
        </tr>
    </table>
    <table>
        <tr>
            <td>Name</td>
            <td>:</td>
            <td>${empPayroll.name}</td>
        </tr>
        <tr>
            <td>Position</td>
            <td>:</td>
            <td>${empPayroll.job_title}</td>
        </tr>
        <tr>
            <td>Pay Date</td>
            <td>:</td>
            <td>${empPayroll.date}</td>
        </tr>
    </table>
    </div>
    <section>
    
    <section>
        <div style="display: flex; display: flex;  ;border-bottom:2px solid #000">
            <table>
                <thead>
                    <th>Earnings</th>
                    <th>Amount(GHC)</th>
                </thead>
                <tr>
                    <td>Basic Pay</td>
                    <td>${empPayroll.basic_wage}</td>
                </tr>
                <tr>
                    <td>Allowances</td>
                    <td>${empPayroll.allowance}</td>
                </tr>
                <tr>
                    <td>Bonus</td>
                    <td>${empPayroll.bonus}</td>
                </tr>
                <tr></tr>
                <tr>
                    <td><b>Total Earnings</b></td>
                    <td>${earning}</td>
                </tr>
            </table>
    
            <table id="deductions">
                <thead>
                    <th>Deductions</th>
                    <th>Amount(GHC)</th>
                </thead>
                <tr>
                    <td>SNNIT</td>
                    <td>${snnit_deduction}</td>
                </tr>
                <tr>
                    <td>Income Tax</td>
                    <td>${empPayroll.income_tax}</td>
                </tr>
                <tr>
                    <td>Bonus Tax</td>
                    <td>${empPayroll.bonus_tax}</td>
                </tr>
                <tr>
                    <!-- <td>&nbsp;</td>
                    <td>&nbsp;</td> -->
                </tr>
                <tr></tr>
                <tr>
                    <td><b>Total Deduction</b></td>
                    <td>${empPayroll.total_deduction}</td>
                </tr>
            </table>
        </div>
    </section>
    <section>
        <div style="display: flex; border-top:2px solid #000 ;border-bottom:2px solid #000">
            <table></table>
            <table>
    
                <tr>
                    <td><b>Net Earning</b></td>
                    <td>${empPayroll.net_salary}</td>
                </tr>
            </table>
        </div>
    </section>
    </section>
    <section>
    <div style="display: flex;">
        <table>
            <tr>
                <td>Employer Signature: &nbsp;<b>APPROVED</b></td>
            </tr>
        </table>
        <table></table>
    </div>
    </section>
    
    </body>
    `;
    return { output: output };
});
exports.slip = slip;
//# sourceMappingURL=payslip.js.map