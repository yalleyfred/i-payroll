import { Router } from "express";
import {createPayReport, createGraReport, createSnnitReport} from "../controllers/reportCont";
const router = Router();

router.route('/d/:month')
.get(createPayReport);



router.route('/snnit/:month').get(createSnnitReport);
router.route('/gra/:month').get(createGraReport);


export default router;