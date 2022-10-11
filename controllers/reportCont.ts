import * as XLSX from 'xlsx';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import Payroll, {PayrollMap} from '../model/payrollModel';
import Database from '../Database';

export const createReport = async(req:Request, res: Response) => {
    try{
     PayrollMap(Database);
        const workSheetColumnName = [
            "name",
            "job_title",
            "basic_salary",
            "allowance"
        ]
        
        const workSheetName = "Payroll";
        const filePath = './report/payroll.xlsx';
        
        // const payrollList = async() => {
       
        //     return await Payroll.findAll();
        // } 
        
        // const list = await payrollList().then(el => {return el}
        // );
        // console.log(list);
        
        const payrollList: Array<T> = [
            {
               "name": "dan",
               "job_title": "level 1",
               "basic_salary": 1100,
               "allowance": 200 
            },
            {
                "name": "fred",
               "job_title": "level 2",
               "basic_salary": 1100,
               "allowance": 200 
            }
        ]
        
        type T = {
            name: string;
            job_title: string;
            basic_salary: number;
            allowance: number;
        }
        
        const exportPayrollToExcel = (payrollList: Array<T>, workSheetColumnName: Array<string>, workSheetName: string, filePath: string) => {
            const data = payrollList.map(payroll => {
                return [payroll.name, payroll.job_title, payroll.basic_salary, payroll.allowance];
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

    }
}
