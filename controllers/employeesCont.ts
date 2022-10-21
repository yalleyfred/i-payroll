import { Request, Response } from "express";
import Employee, { EmployeeMap } from "../model/employeeModel";
import { getErrorMessage } from "../utils/errorUtils";
import {Database, LocalDB} from "../Database";

type E = {
  name: string;
  email: string;
  job_title: string;
  hire_date: Date;
  department: string;
  status: string;
  tin: string;
  snnit: string;
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    EmployeeMap(Database);
    const result = await Employee.findAll();
    res.status(200).json({ employee: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    EmployeeMap(Database);
    const id = Number(req.params.id);
    const result = await Employee.findByPk(id);
    res.status(200).json({ employee: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    EmployeeMap(Database);
    const employee: E = req.body;

    if (
      !employee.name ||
      !employee.email ||
      !employee.job_title ||
      !employee.hire_date ||
      !employee.department ||
      !employee.status ||
      !employee.snnit ||
      !employee.tin
    ) {
      throw new Error("Please fill all fields!");
    }

    const emp = await Employee.findOne({
      where: {
        email: employee.email,
      },
    });

    const existingEmp = emp?.email;

    if (employee.email == existingEmp) {
      throw new Error("Employee already exist!");
    }

    const result = await Employee.create(employee);
    res.status(201).json({ employee: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
