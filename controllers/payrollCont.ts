import { Response, Request } from "express";
import Payroll, { PayrollMap } from "../model/payrollModel";
import { getErrorMessage } from "../utils/errorUtils";
import {Database, LocalDB} from "../Database";
import * as payService from "../service/payService";

export const getAllPayroll = async (req: Request, res: Response) => {
  try {
    PayrollMap(Database || LocalDB);
    let result = await Payroll.findAll();
    res.status(200).json({ payroll: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createPayroll = async (req: Request, res: Response) => {
  try {
    const payroll = await payService.makePayroll(req.body);

    res.status(200).json({
      status: "success",
      result: payroll.payrollData,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getPayroll = async (req: Request, res: Response) => {
  try {
    PayrollMap(Database || LocalDB);
    const id = Number(req.params.id);
    const result = await Payroll.findByPk(id);
    res.status(200).json({ payInfo: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
