import { Router } from "express";
import { createTax, getAllTax } from "../controllers/taxCont";

const router = Router();

/**
 *@openapi
 *  /api/v1/tax:
 *    get:
 *      tags:
 *        - Tax
 *      summary: Get all tax
 *      responses:
 *        200:
 *          description: All tax that exist     
 *        500:
 *          description: Bad request
 */

router.route("/").get(getAllTax);

/**
 * @openapi
 * '/api/v1/tax':
 *    post:
 *      tags:
 *        - Tax
 *      summary: Create Tax
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTaxInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreateTaxResponse'
 *         500: 
 *            description: Bad request
 */
router.route("/").post(createTax);

export default router;