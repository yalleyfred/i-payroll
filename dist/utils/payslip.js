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
    console.log(employee);
    if (!employee.name || !employee.date) {
        throw new Error("Please provide all details");
    }
    const emp = yield employeeModel_1.default.findOne({
        where: {
            name: employee.name,
        },
    });
    if (!(emp === null || emp === void 0 ? void 0 : emp.name)) {
        throw new Error("Employee does not exist");
    }
    const empPayroll = yield payrollModel_1.default.findOne({
        where: {
            name: employee.name,
            date: employee.date,
        },
    });
    const date = empPayroll === null || empPayroll === void 0 ? void 0 : empPayroll.date.toString().slice(0, 7);
    if (date !== employee.date) {
        throw new Error("This month payroll does not exist");
    }
    const snnit_deduction = empPayroll.teir_one + empPayroll.teir_two;
    const earning = empPayroll.basic_wage + empPayroll.allowance + empPayroll.bonus;
    const output = `
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

  * {
      margin: 0;
  }

  body {
      font-family: Inter;
      font-weight: 400;
      font-size: 90%;
      height: auto;
  }

  .flex-container {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .flex-container>div {
      width: 45%;
      border: 1px solid #ccc;
  }

  .flex-container>div>p {
      padding: 6px 0;
  }

  .data_fieldName {
      width: 10%;
  }

  .gutter {
      width: 1%;
      text-align: center;
      /* border: 1px solid #ccc; */
  }

  table tr td {
      border: unset;
      border-collapse: collapse;
      margin: 0;
  }

  .data_field {
      text-align: right;
      /* border: 1px solid #ccc; */
      padding-right: 20px;
  }


  .headers {
      text-align: center;
      padding: 20px 0;
  }

  table {
      padding: 20px;
  }

  #signature {
      height: 80px;
  }
</style>
<body>
    <div style="width:100%; height:auto; background-color: #2e69f7; padding-left: 10%; color: #fff;">
        <h1 style="font-size:6vw; padding: 0.8%;">Employee Payslip</h1>
    </div>
    <div class="flex-container">
        <table style="width: 80%">
            <tr>
                <td class="data_fieldName">Employee no.</td>
                <td class="gutter">:</td>
                <td class="data_field">${emp === null || emp === void 0 ? void 0 : emp.id}</td>

                <td class="data_fieldName">Name</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.name}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Department</td>
                <td class="gutter">:</td>
                <td class="data_field">${emp === null || emp === void 0 ? void 0 : emp.department}</td>

                <td class="data_fieldName">Position</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.job_title}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Date Hired</td>
                <td class="gutter">:</td>
                <td class="data_field">${emp === null || emp === void 0 ? void 0 : emp.hire_date}</td>

                <td class="data_fieldName">Pay date</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.date}</td>
            </tr>
            <tr>
            </tr>
            <th>
                <tr>
                    <td class="headers"><b>Earnings</b></td>
                    <td colspan="2" class="headers"><b>Amount (GHC)</b></td>
                    <td class="headers"><b>Deductions</b></td>
                    <td colspan="2" class="headers"><b>Amount (GHC)</b></td>
                </tr>
            </th>
            <tr>
                <td class="data_fieldName">Basic Pay</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.basic_wage}</td>

                <td class="data_fieldName">SNNIT</td>
                <td class="gutter">:</td>
                <td class="data_field">${snnit_deduction}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Allowance</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.allowance}</td>

                <td class="data_fieldName">Income Tax</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.income_tax}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Bonus</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.bonus}</td>
            </tr>
            <tr>
                <td class="data_fieldName">Bonus Tax</td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.bonus_tax}</td>
            </tr>

            <tr>
                <td class="data_fieldName" class="headers"><b>Total Earnings</b></td>
                <td class="gutter">:</td>
                <td class="data_field">${earning}</td>

                <td class="data_fieldName" class="headers"><b>Total Deduction</b></td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.total_deduction}</td>
            </tr>

            <tr>
                <td class="data_fieldName" class="headers"><b>Net Earnings</b></td>
                <td class="gutter">:</td>
                <td class="data_field">${empPayroll.net_salary}</td>

            </tr>
            <tr id="signature">
                <td colspan="3">
                    Employer Signature: <small>APPROVED</small>
                </td>
            </tr>
        </table>
    </div>
</body>
    `;
    return { output: output, emp: emp, empPayroll: empPayroll };
});
exports.slip = slip;
//# sourceMappingURL=payslip.js.map