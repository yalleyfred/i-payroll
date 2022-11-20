"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanCont_1 = require("../controllers/loanCont");
const router = (0, express_1.Router)();
/**
 *@openapi
 *  /api/v1/loan:
 *    get:
 *      tags:
 *        - Loan
 *      summary: Get all loans
 *      responses:
 *        200:
 *          description: All loans that exist
 *        500:
 *         description: Bad request
 */
router.route("/").get(loanCont_1.getAllLoan);
/**
 * @openapi
 * /api/v1/loan:
 *    post:
 *      tags:
 *        - Loan
 *      summary: Create loan
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateLoanInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreateLoanResponse'
 *         500:
 *            description: Bad request
 */
router.route("/").post(loanCont_1.createLoan);
router.route("/:id").get(loanCont_1.getLoan);
exports.default = router;
//# sourceMappingURL=loanRoute.js.map