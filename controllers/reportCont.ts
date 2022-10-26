import { NextFunction, Request, Response } from "express";

import { getErrorMessage } from "../utils/errorUtils";
import { downloadExcel } from "../service/reportService";


export const createReport = async (req: Request, res: Response) => {
  try {
    
    const excel = await downloadExcel(req.body)
  
    // console.log(exportPayrollToExcel);
    res.download(excel.filePath);
    // res.send("ok");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const download = async(req:Request, res:Response) => {
  try {
    console.log('file downloaded');
    const file = "/report/payroll.xlsx";
    console.log(file);
    
    res.download(file, "payroll.xlsx", function(error: any, result: any) {
      if(error) {
        throw error
      }
      console.log(result);
      
    });
    
  }catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
