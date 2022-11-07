import { Router } from "express";
import {createReport} from "../controllers/reportCont";
const router = Router();

router.route('/')
.post(createReport);





export default router;