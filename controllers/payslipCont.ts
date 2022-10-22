import { Request, Response } from "express";
import Payslip, { PayslipMap } from "../model/payslipModel";
import { Database } from "../Database";
import { getErrorMessage } from "../utils/errorUtils";
import * as Payservice from "../service/payService";

export const getAllPayslip = async (req: Request, res: Response) => {
  try {
    PayslipMap(Database);
    const result = await Payslip.findAll();
    res.status(200).json({ payInfo: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getPayslip = async (req: Request, res: Response) => {
  try {
    PayslipMap(Database);
    const id = Number(req.params.id);
    const result = await Payslip.findByPk(id);
    res.status(200).json({ payInfo: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createPayslip = async (req: Request, res: Response) => {
  try {
    const payslip = await Payservice.makePayslip(req.body);

    res.status(201).json({
      status: "success",
      result: payslip.newPayslip,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
