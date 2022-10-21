import Payslip, { PayslipMap } from "../model/payslipModel";
import Employee, { EmployeeMap } from "../model/employeeModel";
import Payroll, { PayrollMap } from "../model/payrollModel";
import Pay, { PayMap } from "../model/paySchemeModel";
import Loan, { LoanMap } from "../model/loanModel";
import {Database, LocalDB} from "../Database";

import { incomeTax, bonusTax, tierOne, tierTwo, loan } from "../utils/payUtil";

type detail = {
  name: string;
  job_title: string;
  email: string;
  date: Date;
  basic_wage: number;
  allowance: number;
  bonus: number;
  income_tax: number;
  bonus_tax: number;
  snnit_deduction: number;
  loan_deduction: number;
  total_deduction: number;
  net_salary: number;
};

type payDetail = { basic: number; allowance: number; bonus: number };

type payroll = { name: string; job_title: string; month_year: Date };

export const makePayslip = async (employee: { name: string }) => {
  try {
    PayrollMap(Database);
    PayslipMap(Database);
    EmployeeMap(Database);

    if (!employee.name) {
      throw new Error("Please provide employee name");
    }

    const empPayroll = await Payroll.findOne({
      where: {
        name: employee.name,
      },
    });

    const emp = await Employee.findOne({
      where: {
        name: employee.name,
      },
    });

    if (emp?.name !== empPayroll?.name) {
      throw new Error("Employee doesnt exist");
    }
    const snnit_deduction: number = empPayroll!.teir_one + empPayroll!.teir_two;
    const earning: number =
      empPayroll!.basic_wage + empPayroll!.allowance + empPayroll!.bonus;

    const newPayslip: detail = {
      name: empPayroll!.name,
      job_title: empPayroll!.job_title,
      email: empPayroll!.email,
      allowance: empPayroll!.allowance,
      basic_wage: empPayroll!.basic_wage,
      date: empPayroll!.date,
      bonus: empPayroll!.bonus,
      income_tax: empPayroll!.income_tax,
      bonus_tax: empPayroll!.bonus_tax,
      snnit_deduction: snnit_deduction,
      loan_deduction: empPayroll!.loan_deduction,
      total_deduction: empPayroll!.total_deduction,
      net_salary: empPayroll!.net_salary,
    };

    const output: string = `
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
                        <td>${emp?.id}</td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>:</td>
                        <td>${emp?.department}</td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td>:</td>
                        <td>{Date}</td>
                    </tr>
                    <tr>
                        <td>Date Hired</td>
                        <td>:</td>
                        <td>${emp?.hire_date}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>${newPayslip.name}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td>${newPayslip.job_title}</td>
                    </tr>
                    <tr>
                        <td>Pay Date</td>
                        <td>:</td>
                        <td>${newPayslip.date}</td>
                    </tr>
                    <tr>
                        <td>PaySlip ID</td>
                        <td>:</td>
                        <td>{ha}</td>
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
                                <td>${newPayslip.basic_wage}</td>
                            </tr>
                            <tr>
                                <td>Allowances</td>
                                <td>${newPayslip.allowance}</td>
                            </tr>
                            <tr>
                                <td>Overtime</td>
                                <td>{value}</td>
                            </tr>
                            <tr>
                                <td>Bonus</td>
                                <td>${newPayslip.bonus}</td>
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
                                <td>${newPayslip.income_tax}</td>
                            </tr>
                            <tr>
                                <td>Bonus Tax</td>
                                <td>${newPayslip.bonus_tax}</td>
                            </tr>
                            <tr>
                                <td>Overtime Tax</td>
                                <td>{value}</td>
                            </tr>
                            <tr>
                                <!-- <td>&nbsp;</td>
                                <td>&nbsp;</td> -->
                            </tr>
                            <tr></tr>
                            <tr>
                                <td><b>Total Deduction</b></td>
                                <td>${newPayslip.total_deduction}</td>
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
                                <td>${newPayslip.net_salary}</td>
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

    await Payslip.create(newPayslip);

    return { newPayslip: newPayslip, output: output, email: newPayslip.email };
  } catch (error) {
    throw error;
  }
};

export async function makePayroll(employee: payroll) {
  try {
    PayMap(Database);
    PayrollMap(Database);
    EmployeeMap(Database);
    LoanMap(Database);

    const empDetails = {
      name: employee.name,
      month_year: employee.month_year,
    };

    if (!employee.name || !employee.month_year) {
      throw new Error("Please provide employee name and date of payment");
    }

    const payDate = empDetails.month_year.toString();
    const emp = await Employee.findOne({
      where: {
        name: employee.name,
      },
    });
    if (emp == null) {
      throw new Error("Employee does not exist");
    }

    const employeeEmail = emp?.email;
    const employeeJobtitle = emp?.job_title;

    const empLoan = await Loan.findOne({
      where: {
        name: emp?.name,
      },
    });

    const loanAmt = empLoan?.amount;
    const loanToPay = loan(loanAmt);

    let l1 = await Pay.findOne({
      where: {
        job_title: "level 1",
      },
    });

    let lvl_one = l1?.job_title;

    let L2 = await Pay.findOne({
      where: {
        job_title: "level 2",
      },
    });

    let lvl_two = L2?.job_title;

    let L3 = await Pay.findOne({
      where: {
        job_title: "level 3",
      },
    });

    let lvl_three = L3?.job_title;

    let jAssociate = await Pay.findOne({
      where: {
        job_title: "Junior Associate",
      },
    });

    let jnr_Associate = jAssociate?.job_title;

    let sAssociate = await Pay.findOne({
      where: {
        job_title: "Senior Associate",
      },
    });

    let snr_Associate = sAssociate?.job_title;

    if (
      employeeJobtitle == lvl_one ||
      employeeJobtitle == lvl_two ||
      employeeJobtitle == lvl_three ||
      employeeJobtitle == jnr_Associate ||
      employeeJobtitle == snr_Associate
    ) {
      const empPay = await Payroll.findAll({
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

      let newPay = await Pay.findOne({
        where: {
          job_title: employeeJobtitle,
        },
      });

      let myObj: payDetail = {
        basic: newPay!.basic_salary,
        allowance: newPay!.allowance,
        bonus: newPay!.bonus,
      };
      const TCE: number = myObj.basic + myObj.allowance;
      const teir_one: number = tierOne(myObj.basic);
      const teir_two: number = tierTwo(myObj.basic);
      const TaxRelief: number = teir_one + teir_two;
      const grossSalary: number = myObj.basic + myObj.allowance + myObj.bonus;
      const taxableIncome: number = grossSalary - TaxRelief;
      const income_tax: number = incomeTax(taxableIncome);
      const bonus_tax: number = bonusTax(TCE, myObj.bonus, taxableIncome);
      const totalDeduction: number =
        teir_one + teir_two + income_tax + bonus_tax;
      const netSalary: number = grossSalary - totalDeduction;

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

      await Payroll.create(payrollData);

      return { payrollData: payrollData };
    }

    throw new Error("Job title does not exit in the firm");
  } catch (error) {
    throw error;
  }
}
