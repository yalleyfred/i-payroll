"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payslipCont_1 = require("../controllers/payslipCont");
const router = (0, express_1.Router)();
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
router.route("/").get(payslipCont_1.getAllPayslip);
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
router.route("/").post(payslipCont_1.createPayslip);
router.route("/:id").get(payslipCont_1.getPayslip);
exports.default = router;
//# sourceMappingURL=payslipRoute.js.map