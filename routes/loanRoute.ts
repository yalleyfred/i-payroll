import { Router } from "express";
import { getAllLoan, createLoan, getLoan } from "../controllers/loanCont";
const router = Router();

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
router.route("/").get(getAllLoan);

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
router.route("/").post(createLoan)

router.route("/:id").get(getLoan);

export default router;
