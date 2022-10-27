import { NextFunction, Request, Response } from "express";

import { getErrorMessage } from "../utils/errorUtils";
import { downloadExcel } from "../service/reportService";
import path from "path";

import Payroll, { PayrollMap } from "../model/payrollModel";
import Tax, {TaxMap} from '../model/taxModel';
import Snnit, {SnnitMap} from "../model/snnitModel";
import {Database} from "../Database";
import * as XLSX from "xlsx";
const createCsvWriter = require("csv-writer").createCsvWriter;

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
    console.log("DATE:", req.params)

    const date = {date:req.params.month};

    console.log(date.date)
    
    PayrollMap(Database);

    // const payroll = await Payroll.findAll({
    //   where: {
    //     date: date.date
    //   }
    // })
    // console.log(payroll);
    // // {
    // //   name: payroll.name,
    // //   job_title: payroll.job_title,
    // //    email:   payroll.email,
    // //     date:  payroll.date,
    // //     basic_wage:  payroll.basic_wage,
    // //     allowance:   payroll.allowance,
    // //    bonus:    payroll.bonus,
    // //    income_tax:   payroll.income_tax,
    // //   bonus_tax:    payroll.bonus_tax,
    // //   teir_one:    payroll.teir_one,
    // //   teir_two:   payroll.teir_two,
    // //   loan_deduction:    payroll.loan_deduction,
    // //  total_deduction:     payroll.total_deduction,
    // //  net_salary:     payroll.net_salary,
    // // }
    
    // const csvWriter = createCsvWriter({
    //   path: '../report/payroll.cvs',
    //   header: [
    //     {id: payroll.name, title: "Name"},
    //     {id: payroll.job_title, title: "Job_title"},
    //     {id: payroll.email, title: "Email"},
    //     {id: payroll.date, title: "Date"},
    //     {id: payroll.basic_salary, title: "Basic Salary"},
    //   ]
    // });

    // csvWriter.writeFile
    //   const file = path.join(__dirname, '../../report/payroll.xlsx');
    // console.log(file)
   
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
      const filePath = path.join(__dirname, '../../report/payroll.xlsx');
  
      const payrollList: Array<P> = await Payroll.findAll({
        where: {
          date: date.date
        }
      });
  
      
      if(payrollList.length < 1) {
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
        XLSX.writeFile(workBook, path.resolve(filePath));
        return workSheet;
      };
  
      exportPayrollToExcel(
        payrollList,
        workSheetColumnName,
        workSheetName,
        filePath
      );
  

    res.setHeader('Content-disposition', 'attachment; filename=payroll.xlsx');


    // const excel = await downloadExcel(date)
  
    // console.log(exportPayrollToExcel);
    res.download(filePath);
    // res.send("ok");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createGraReport = async(req:Request, res:Response) => {
  try {
    const date = {date:req.params.month};

    console.log(date.date);
    TaxMap(Database);

    // const file = path.join(__dirname, '../../report/taxReport.xlsx');
    // console.log(file)
   
      console.log(date);
      
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
      const filePath = path.join(__dirname, '../../report/taxReport.xlsx');
  
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
        XLSX.writeFile(workBook, path.resolve(filePath));
        return workSheet;
      };
  
      exportPayrollToExcel(
        TaxList,
        workSheetColumnName,
        workSheetName,
        filePath
      );
  

    // res.setHeader('Content-disposition', 'attachment; filename=payroll.xlsx');

    res.send(filePath);
        console.log(res);
        
    
  }catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export const createSnnitReport = async(req:Request, res:Response) => {
  try {
    const date = {date:req.params.month};

    console.log(date.date);
    SnnitMap(Database);

    const file = path.join(__dirname, '../../report/snnitReport.xlsx');
    console.log(file)
   
      console.log(date);
      
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
      const filePath = path.join(__dirname, '../../report/snnitReport.xlsx');
  
      const SnnitList: Array<S> = await Snnit.findAll({
        where: {
          date: date.date
        }
      });
  
      
      if(SnnitList.length < 1) {
        throw new Error("There is no payroll with for this date")
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
        XLSX.writeFile(workBook, path.resolve(filePath));
        return workSheet;
      };
  
      exportPayrollToExcel(
        SnnitList,
        workSheetColumnName,
        workSheetName,
        filePath
      );
  

    res.setHeader('Content-disposition', 'attachment; filename=payroll.xlsx');

    res.download(file);

    
  }catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}