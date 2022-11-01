import { NextFunction, Request, Response } from "express";

import { getErrorMessage } from "../utils/errorUtils";
import path from "path";

import Payroll, { PayrollMap } from "../model/payrollModel";
import Tax, {TaxMap} from '../model/taxModel';
import Snnit, {SnnitMap} from "../model/snnitModel";
import {Database} from "../Database";
import * as XLSX from "xlsx";

type P = {
  name: string;
  job_title: string;
  email: string;
  date: Date;
  basic_wage: number;
  allowance: number;
  bonus: number;
  income_tax: number;
  bonus_tax: number;
  teir_one: number;
  teir_two: number;
  loan_deduction: number;
  total_deduction: number;
  net_salary: number;
};

type T = {
  name: string;
  tin: string;
  date: Date;
  basic_salary: number;
  tax_relief: number;
  net_taxable_pay: number;
  total_tax_deduction: number;
};

type S = {
  name: string;
  snnit_no: string;
  date: Date;
  basic_salary: number;
  tier_one: number;
  tier_two: number;
  total_snnit_contribution: number;
};

export const createPayReport = async (req: Request, res: Response) => {
  try {
 

    const date = {date:req.params.month};

    
    PayrollMap(Database);

   
   
      console.log(date);
      
      const workSheetColumnName = [
        "name",
        "job_title",
        "email",
        "date",
        "basic_wage",
        "allowance",
        "bonus",
        "income_tax",
        "bonus_tax",
        "teir_one",
        "teir_two",
        "loan_deduction",
        "total_deduction",
        "net_salary",
      ];

      const workSheetName = "Payroll";
      const filePath = path.join(__dirname, '../report/payroll.xlsx');
  
      const payrollList: Array<P> = await Payroll.findAll({
        where: {
          date: date.date
        }
      });
  
      
      if(payrollList.length < 1 || payrollList == undefined) {
        throw new Error("There is no payroll with for this date")
      }
  
  
      const exportPayrollToExcel = (
        payrollList: Array<P>,
        workSheetColumnName: Array<string>,
        workSheetName: string,
        filePath: string
      ) => {
        const data = payrollList.map((payroll) => {
          return [
            payroll.name,
            payroll.job_title,
            payroll.email,
            payroll.date,
            payroll.basic_wage,
            payroll.allowance,
            payroll.bonus,
            payroll.income_tax,
            payroll.bonus_tax,
            payroll.teir_one,
            payroll.teir_two,
            payroll.loan_deduction,
            payroll.total_deduction,
            payroll.net_salary,
          ];
        });
  
        const workBook = XLSX.utils.book_new();
        const workSheetData = [workSheetColumnName, ...data];
        const workSheet = XLSX.utils.json_to_sheet(workSheetData);
        XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
        XLSX.writeFile(workBook, path.resolve(filePath), {type: "buffer"});
        return workSheet;
      };
  
      exportPayrollToExcel(
        payrollList,
        workSheetColumnName,
        workSheetName,
        filePath
      );
  
   

    res.status(200).sendFile(filePath);

  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createGraReport = async(req:Request, res:Response) => {
  try {
    const date = {date:req.params.month};

    TaxMap(Database);
   

      
      const workSheetColumnName = [
        "name",
        "tin",
        "date",
        "basic_salary",
        "tax_relief",
        "net_taxable_pay",
        "total_tax_deduction",
      ];

      const workSheetName = "Tax Filling";
      const filePath = path.join(__dirname, '../report/taxReport.xlsx');
  
      const TaxList: Array<T> = await Tax.findAll({
        where: {
          date: date.date
        }
      });
  
      
      if(TaxList.length < 1) {
        throw new Error("There is no payroll with for this date")
      }
  
  
      const exportPayrollToExcel = (
        payrollList: Array<T>,
        workSheetColumnName: Array<string>,
        workSheetName: string,
        filePath: string
      ) => {
        const data = payrollList.map((tax) => {
          return [
            tax.name,
            tax.tin,
            tax.date,
            tax.basic_salary,
            tax.tax_relief,
            tax.net_taxable_pay,
            tax.total_tax_deduction
          ];
        });
  
        const workBook = XLSX.utils.book_new();
        const workSheetData = [workSheetColumnName, ...data];
        const workSheet = XLSX.utils.json_to_sheet(workSheetData);
        XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
        XLSX.writeFile(workBook, path.resolve(filePath), {type: "buffer"});
        return workSheet;
      };
  
      exportPayrollToExcel(
        TaxList,
        workSheetColumnName,
        workSheetName,
        filePath
      );
  
       
    res.status(200).sendFile(filePath);

        
    
  }catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export const createSnnitReport = async(req:Request, res:Response) => {
  try {
    const date = {date:req.params.month};


    SnnitMap(Database);

   

      
      const workSheetColumnName = [
        "name",
        "tin",
        "date",
        "basic_salary",
        "tax_relief",
        "net_taxable_pay",
        "total_tax_deduction",
      ];

      const workSheetName = "Snnit Filling";
      const filePath = path.join(__dirname, '../report/snnitReport.xlsx');
  
      const SnnitList: Array<S> = await Snnit.findAll({
        where: {
          date: date.date
        }
      });
  
      
      if(SnnitList.length < 1) {
        throw new Error("There is no payroll with for this date");
      }
  
  
      const exportPayrollToExcel = (
        payrollList: Array<S>,
        workSheetColumnName: Array<string>,
        workSheetName: string,
        filePath: string
      ) => {
        const data = payrollList.map((snnit) => {
          return [
            snnit.name,
            snnit.snnit_no,
            snnit.date,
            snnit.basic_salary,
            snnit.tier_one,
            snnit.tier_two,
            snnit.total_snnit_contribution
          ];
        });
  
        const workBook = XLSX.utils.book_new();
        const workSheetData = [workSheetColumnName, ...data];
        const workSheet = XLSX.utils.json_to_sheet(workSheetData);
        XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
        XLSX.writeFile(workBook, path.resolve(filePath), {type: "buffer"});
        return workSheet;
      };
  
      exportPayrollToExcel(
        SnnitList,
        workSheetColumnName,
        workSheetName,
        filePath
      );
  


    res.status(200).sendFile(filePath);

    
  }catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}