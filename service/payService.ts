import Payslip, { PayslipMap } from "../model/payslipModel";
import Employee, { EmployeeMap } from "../model/employeeModel";
import Payroll, { PayrollMap } from "../model/payrollModel";
import Pay, { PayMap } from "../model/paySchemeModel";
import Loan, { LoanMap } from "../model/loanModel";
import { Database } from "../Database";

import { incomeTax, bonusTax, tierOne, tierTwo, loan } from "../utils/payUtil";
import { slip } from "../utils/payslip";
import { sendEmail } from "../utils/email";
import { DATEONLY } from "sequelize";

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

export const makePayslip = async (employee: { name: string; date: string }) => {
  try {
    PayrollMap(Database);
    PayslipMap(Database);
    EmployeeMap(Database);

    const out = await slip(employee);
    const output = out.output;

    const empPayroll = out.empPayroll;
    const emp = out.emp;

    const snnit_deduction: number = empPayroll!.teir_one + empPayroll!.teir_two;

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

    const payslip = await Payslip.findAll({
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

    await Payslip.create(newPayslip);
    await sendEmail({
      email: newPayslip.email,
      subject: "ipayroll",
      message: output,
    });

    return { newPayslip: newPayslip };
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

    if(emp.hire_date.toString().slice(2, 7) > payDate.slice(2, 7)) {
      throw new Error("You can not pay an employee before the hire date");
       
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
