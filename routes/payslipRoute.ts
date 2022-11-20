import { Router } from "express";
import {
  getAllPayslip,
  getPayslip,
  createPayslip,
} from "../controllers/payslipCont";
const router = Router();

/**
 *@openapi
 *  /api/v1/payslip:
 *    get:
 *      tags:
 *        - Payslip
 *      summary: Get all payslip
 *      responses:
 *        200:
 *          description: All payslip that exist     
 *        500:
 *          description: Bad request
 */
router.route("/").get(getAllPayslip);

/**
 * @openapi
 * '/api/v1/payslip':
 *    post:
 *      tags:
 *        - Payslip
 *      summary: Create Payslip
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePayslipInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreatePayslipResponse'
 *         500: 
 *            description: Bad request
 */
router.route("/").post(createPayslip);

router.route("/:id").get(getPayslip);

export default router;
