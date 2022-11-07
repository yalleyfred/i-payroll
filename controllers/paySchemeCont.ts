import { Request, Response } from "express";
import Pay, { PayMap } from '../model/paySchemeModel';
import { getErrorMessage } from '../utils/errorUtils';
import Database from '../Database';

type P = {
    job_title: string;
    basic_salary: number;
    allowance: number;
    bonus: number;
   
}


export const createPay = async(req: Request, res: Response) => {
    try {
        const newPay: P = req.body as Pay;
    
        PayMap(Database);
        let result = await Pay.create(newPay);
        
        res.status(200).json({
            status: 'success',
            pay: result
        });
    }catch (error) {
     return res.status(500).send(getErrorMessage(error));
    }
    
}

export const getAllPay = async(req:Request, res: Response) => {
    try {
        PayMap(Database);
        const result = await Pay.findAll();
        res.status(200).json({
            status: 'success',
            pay: result
        });
    }catch (error) {
     return res.status(500).send(getErrorMessage(error));
    }
}