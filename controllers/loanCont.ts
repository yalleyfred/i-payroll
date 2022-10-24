import { Request, Response } from "express";
import Loan, { LoanMap } from "../model/loanModel";
import {Database, LocalDB} from "../Database";
import { getErrorMessage } from "../utils/errorUtils";

export const getAllLoan = async (req: Request, res: Response) => {
  try {
    LoanMap(Database);
    const loans = await Loan.findAll();
    res.status(200).json({ result: loans });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getLoan = async (req: Request, res: Response) => {
  try {
    LoanMap(Database);
    const id = Number(req.params.id);
    const result = await Loan.findByPk(id);
    res.status(200).json({ user: result });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createLoan = async (req: Request, res: Response) => {
  try {
    LoanMap(Database);

    const newLoan = req.body;
    await Loan.create(newLoan);
    res.status(200).json({
      message: "success",
      result: newLoan,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
