"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const snnitCont_1 = require("../controllers/snnitCont");
const router = (0, express_1.Router)();
/**
 *@openapi
 *  /api/v1/snnit:
 *    get:
 *      tags:
 *        - Snnit
 *      summary: Get all snnit
 *      responses:
 *        200:
 *          description: All snnit that exist
 *        500:
 *          description: Bad request
 */
router.route("/").get(snnitCont_1.getAllSnnit);
/**
 * @openapi
 * '/api/v1/snnit':
 *    post:
 *      tags:
 *        - Snnit
 *      summary: Create Snnit
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSnnitInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreateSnnitResponse'
 *         500:
 *            description: Bad request
 */
router.route("/").post(snnitCont_1.createSnnit);
exports.default = router;
//# sourceMappingURL=snnitRoute.js.map