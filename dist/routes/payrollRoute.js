"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payrollCont_1 = require("../controllers/payrollCont");
const router = (0, express_1.Router)();
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
router.route("/").get(payrollCont_1.getAllPayroll);
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
router.route("/").post(payrollCont_1.createPayroll);
router.route("/:id").get(payrollCont_1.getPayroll);
exports.default = router;
//# sourceMappingURL=payrollRoute.js.map