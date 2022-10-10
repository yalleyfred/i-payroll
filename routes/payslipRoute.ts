import {Router} from 'express';
import { getAllPayslip, getPayslip, createPayslip } from '../controllers/payslipCont';
const router = Router();

router.route('/')
.get(getAllPayslip)
.post(createPayslip);

router.route('/:id')
.get(getPayslip);

export default router;