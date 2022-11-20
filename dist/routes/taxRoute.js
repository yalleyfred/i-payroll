"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxCont_1 = require("../controllers/taxCont");
const router = (0, express_1.Router)();
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
router.route("/").get(taxCont_1.getAllTax);
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
router.route("/").post(taxCont_1.createTax);
exports.default = router;
//# sourceMappingURL=taxRoute.js.map