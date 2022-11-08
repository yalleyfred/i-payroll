import { Request, Response } from "express";
import Tax, { TaxMap } from "../model/taxModel";
import Payroll, { PayrollMap } from "../model/payrollModel";
import Employee, { EmployeeMap } from "../model/employeeModel";
import { getErrorMessage } from "../utils/errorUtils";
import { Database } from "../Database";

export const createTax = async (req: Request, res: Response) => {
  try {
    PayrollMap(Database);
    EmployeeMap(Database);
    TaxMap(Database);

    const { name, date } = req.body;

    if (!name || !date) {
      throw new Error("Please fill all fields");
    }

    const emp = await Employee.findOne({
      where: {
        name: name,
      },
    });

    if (!emp) {
      throw new Error("Employee does not exist!");
    }

    const empPayroll = await Payroll.findOne({
      where: {
        name: name,
        date: date,
      },
    });

    if (!empPayroll) {
      throw new Error("employee has no payroll record!");
    }
    const payDate = empPayroll?.date.toString().slice(0, 7);

    if (payDate !== date) {
      throw new Error("There is no payroll for this month!");
    }

    const taxes = await Tax.findAll({
      where: {
        name: name,
      },
    });

    for (let i = 0; i < taxes.length; i++) {
      const mnt = taxes[i].date.toString().slice(0, 7);

      if (mnt == date) {
        throw new Error("this tax has been created already");
      }
    }

    const relief = empPayroll?.teir_one + empPayroll?.teir_two;
    const net_taxable_pay = empPayroll.basic_wage - relief;
    const empTax = {
      name: empPayroll.name,
      basic_salary: empPayroll.basic_wage,
      tax_relief: relief,
      net_taxable_pay: net_taxable_pay,
      total_tax_deduction: empPayroll.income_tax,
      tin: emp.tin,
      date: date,
    };
    let result = await Tax.create(empTax);

    res.status(200).json({
      message: "success",
      pay: result,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getAllTax = async (req: Request, res: Response) => {
  try {
    TaxMap(Database);
    const result = await Tax.findAll();
    res.status(200).json({
      status: "success",
      tax: result,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
