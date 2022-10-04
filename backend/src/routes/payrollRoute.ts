import { Router } from "express";
import { getAllPayroll, createPayroll } from "../controllers/payrollController";
const router = Router();

router.route('/')
.get(getAllPayroll)
.post(createPayroll);



export default router;