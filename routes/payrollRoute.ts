import { Router } from "express";
import {
  getAllPayroll,
  createPayroll,
  getPayroll,
} from "../controllers/payrollCont";
const router = Router();

/**
 *@openapi
 *  /api/v1/payroll:
 *    get:
 *      tags:
 *        - Payroll
 *      summary: Get all payroll
 *      responses:
 *        200:
 *          description: All payroll that exist
 *        500:
 *          description: Bad request
 */

router.route("/").get(getAllPayroll);

/**
 * @openapi
 * '/api/v1/payroll':
 *    post:
 *      tags:
 *        - Payroll
 *      summary: Create Payroll
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePayrollInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreatePayrollResponse'
 *         500: 
 *            description: Bad request
 */
router.route("/").post(createPayroll);

router.route("/:id").get(getPayroll);

export default router;
