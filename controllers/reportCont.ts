import * as XLSX from 'xlsx';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import Payroll, {PayrollMap} from '../model/payrollModel';
import Database from '../Database';
import { getErrorMessage } from '../utils/errorUtils';


type T = {
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
}


export const createReport = async(req:Request, res: Response) => {
    try{
     PayrollMap(Database);
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
            "net_salary"
        ]
        
        const workSheetName = "Payroll";
        const filePath = './report/payroll.xlsx';
        
        // const payrollList = async() => {
       
        //     return await Payroll.findAll();
        // } 
        
        // const list = await payrollList().then(el => {return el}
        // );
        // console.log(list);

        const payrollList: Array<T> = await Payroll.findAll();
        
        
        
        
        
        const exportPayrollToExcel = (payrollList: Array<T>, workSheetColumnName: Array<string>, workSheetName: string, filePath: string) => {
            const data = payrollList.map(payroll => {
                return [payroll.name, payroll.job_title, payroll.email, payroll.date, payroll.basic_wage, payroll.allowance, payroll.bonus,
                payroll.income_tax, payroll.bonus_tax, payroll.teir_one, payroll.teir_two, payroll.loan_deduction, payroll.total_deduction, payroll.net_salary];
            });
            const workBook = XLSX.utils.book_new();
            const workSheetData = [
                workSheetColumnName,
                ...data
            ];
            const workSheet = XLSX.utils.json_to_sheet(workSheetData);
            XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
            XLSX.writeFile(workBook, path.resolve(filePath));
            return true;
        }
        
        
        exportPayrollToExcel(payrollList, workSheetColumnName, workSheetName, filePath);
        console.log(exportPayrollToExcel);
        res.send("ok");        
    }catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
}
