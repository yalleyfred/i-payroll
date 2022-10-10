import { Router } from "express";
import {getAllLoan, createLoan, getLoan } from "../controllers/loanCont";
const router = Router();

router.route('/')
.get(getAllLoan)
.post(createLoan);

router.route('/:id').get(getLoan);



export default router;