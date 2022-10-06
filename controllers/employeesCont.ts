import { Request, Response } from 'express';
import Employee, { EmployeeMap } from '../model/employeeModel';
import { getErrorMessage } from '../utils/errorUtils';
import database from '../Database';

export const getAllEmployees =async (req:Request, res: Response) => {
    try {
        EmployeeMap(database);
        const result = await Employee.findAll();
        res.status(200).json({ employee: result });
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
   
}

export const getEmployee =async (req:Request, res: Response) => {
    try {
        EmployeeMap(database);
        const id = Number(req.params.id);
        const result = await Employee.findByPk(id);
        res.status(200).json({ employee: result });
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  
}

export const createEmployee =async (req:Request, res: Response) => {
    try {
    let newEmployee: {} = req.body as Employee;
    EmployeeMap(database);
    const result = await Employee.create(newEmployee);
    res.status(201).json({ employee: result });
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
    
}



export const updateEmployee =async (req:Request, res: Response) => {
   try {

   }catch (error) {
    return res.status(500).send(getErrorMessage(error));
   }
}

export const deleteEmployee =async (req:Request, res: Response) => {
   try {

   }catch (error) {
    return res.status(500).send(getErrorMessage(error));
   }
}