import { Request, Response } from "express";
import Snnit, { SnnitMap } from "../model/snnitModel";
import Payroll, {PayrollMap} from "../model/payrollModel";
import Employee, {EmployeeMap} from "../model/employeeModel";
import { getErrorMessage } from "../utils/errorUtils";
import {Database} from "../Database";



export const createSnnit = async (req: Request, res: Response) => {
  try {
    PayrollMap(Database);
    EmployeeMap(Database);
    SnnitMap(Database);

    const {name, date} = req.body;

    if(!name || !date) {
      throw new Error("Please fill all fields");
    }

    const emp = await Employee.findOne({
        where: {
            name: name,
        }
    })

    if(!emp) {
        throw new Error("Employee does not exist!");
    }

    const empPayroll = await Payroll.findOne({
        where: {
            name: name,
            date: date
        }
    })

    if(!empPayroll) {
        throw new Error("employee has no payroll record!");
    }

    if(empPayroll?.date !== date) {
        throw new Error("There is not payroll for this month!");
    }

    const snnit = await Snnit.findAll({
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

    
    const total_snnit_contribution = empPayroll?.teir_one + empPayroll?.teir_two;
    const empSnnit = {
        name: empPayroll.name,
        basic_salary: empPayroll.basic_wage,
        tier_one: empPayroll.teir_one,
        tier_two: empPayroll.teir_two,
        total_snnit_contribution: total_snnit_contribution,
        snnit_no: emp.snnit,
        date: date
    }
    let result = await Snnit.create(empSnnit);

    res.status(200).json({
      status: "success",
      pay: result,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getAllSnnit = async (req: Request, res: Response) => {
  try {
    SnnitMap(Database);
    const result = await Snnit.findAll();
    res.status(200).json({
      status: "success",
      snnit: result,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
