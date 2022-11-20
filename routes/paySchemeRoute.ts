import { Router } from "express";
import { createPay, getAllPay } from "../controllers/paySchemeCont";

const router = Router();

/**
 *@openapi
 *  /api/v1/payScheme:
 *    get:
 *      tags:
 *        - Payscheme
 *      summary: Get all payscheme
 *      responses:
 *        200:
 *          description: All payscheme that exist
 *        500:
 *          description: Bad request
 */

router.route("/").get(getAllPay);

router.route("/").post(createPay);

export default router;
