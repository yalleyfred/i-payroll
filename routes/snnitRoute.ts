import { Router } from "express";
import { createSnnit, getAllSnnit } from "../controllers/snnitCont";

const router = Router();

router.route("/").get(getAllSnnit).post(createSnnit);

export default router;