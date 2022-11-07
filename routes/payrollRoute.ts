import { Router } from "express";
import { getAllPayroll, createPayroll, getPayroll } from "../controllers/payrollCont";
const router = Router();

router.route('/')
.get(getAllPayroll)
.post(createPayroll);

router.route('/:id').get(getPayroll);



export default router;