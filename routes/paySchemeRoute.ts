import { Router } from "express";
import {createPay, getAllPay} from '../controllers/paySchemeCont';

const router = Router();


router.route('/')
.get(getAllPay)
.post(createPay);


export default router;