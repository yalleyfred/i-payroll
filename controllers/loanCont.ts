import { Request, Response } from 'express';
import Loan, {LoanMap} from '../model/loanModel';
import Employee, {EmployeeMap} from "../model/employeeModel"
import {Database}from '../Database';
import { getErrorMessage } from '../utils/errorUtils';

export const getAllLoan = async (req: Request, res: Response) => {
    try {
        LoanMap(Database);
      console.log("hello");
      
        const loans = await Loan.findAll();
        res.status(200).json({result: loans});
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
}

export const getLoan = async (req: Request, res: Response) => {
    try {
        LoanMap(Database);
      const id = Number(req.params.id);
      const result = await Loan.findByPk(id);
      res.status(200).json({ user: result });
      }catch (error) {
        return res.status(500).send(getErrorMessage(error));
      }
}

export const createLoan = async (req: Request, res: Response) => {
   try {
    LoanMap(Database);
    EmployeeMap(Database);

    const newLoan: {
      name: string;
      amount: string;
      date: string;
    } = req.body;
    console.log(newLoan.date.slice(2, 7));
    
    if(!newLoan.name || !newLoan.amount || !newLoan.date) {
      throw new Error("Please fill all fields");
    }

    const emp = await Employee.findOne({
        where: {
            name: newLoan.name,
        }
    })

    
    if(!emp) {
        throw new Error("Employee does not exist!");
    }
    
    if(emp.hire_date.toString().slice(2, 7) > newLoan.date.slice(2, 7)) {
      throw new Error("You cant give an employee loan before hire date");
       
     }

     const loan = await Loan.findAll({
      where: {
        name: newLoan.name
      }
    });
     
      
    for (let i = 0; i < loan.length; i++) {
      const mnt = loan[i].date.toString().slice(2, 7);
      console.log(mnt);
      
      if (mnt == newLoan.date.slice(2, 7)) {
        throw new Error("this loan has been created already");
      }
    }


     await Loan.create(newLoan);
     res.status(200).json({
        message: 'success',
        result: newLoan
     })
   }catch (error) {
    return res.status(500).send(getErrorMessage(error));
   }
}