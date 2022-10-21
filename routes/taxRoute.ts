import { Router } from "express";
import { createTax, getAllTax } from "../controllers/taxCont";

const router = Router();

router.route("/").get(getAllTax).post(createTax);

export default router;