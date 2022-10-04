import { Request, Response } from "express";
import Pay, { PayMap } from '../model/payModel';
import { getErrorMessage } from '../utils/errorUtils';
import database from '../Database';

export const createPay = async(req: Request, res: Response) => {
    try {
        let newPay:{} = req.body as Pay;
    console.log(newPay);
    
   
    PayMap(database);
    let result = await Pay.create(newPay);
    
    res.status(200).json({pay: result})
    }catch (error) {
     return res.status(500).send(getErrorMessage(error));
    }
    
}

export const getAllPay = async(req:Request, res: Response) => {
    try {
        PayMap(database);
        let result = await Pay.findAll();
        res.status(200).json({pay: result});
    }catch (error) {
     return res.status(500).send(getErrorMessage(error));
    }
}