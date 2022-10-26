import { Router } from "express";
import {createReport, download} from "../controllers/reportCont";
const router = Router();

router.route("/").post(createReport);


router.route('/payroll').get(download);
router.route('/snnit').get(download);
router.route('/gra').get(download);

export default router;
