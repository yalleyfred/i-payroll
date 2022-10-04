import { Request, Response } from 'express';
import Payslip, { PayslipMap } from '../model/payslipModel';
import Payroll, { PayrollMap } from '../model/payrollModel';
import database from '../Database';
import nodemailer from 'nodemailer';
import Database from '../Database';
import { getErrorMessage } from '../utils/errorUtils';
import * as Payservice from "./../service/PayService";
import { sendEmail } from '../utils/email';




export const getAllPayslip = async (req:Request, res: Response) => {
    
    PayslipMap(database);
    const result = await Payslip.findAll();
    res.status(200).json({ payInfo: result });
}

export const getPayslip = async (req:Request, res: Response) => {
    PayslipMap(database);
    const id = Number(req.params.id);
    const result = await Payslip.findByPk(id);
    res.status(200).json({ payInfo: result });
}

export const createPayslip = async (req:Request, res: Response) => {
    try {
            const payslip = await Payservice.makePayslip(req.body);
            
            res.status(201).json({
                status: "success",
                result: payslip.newPayslip
            });
        
            await sendEmail({
                email: "yalleyfres@gmail.com",
                subject: "ipayroll",
                text: "Payslip",
                message: payslip?.output
            })
   
    }catch (error) {
     return res.status(500).send(getErrorMessage(error));
    }

}

