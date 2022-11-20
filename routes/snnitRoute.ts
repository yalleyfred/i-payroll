import { Router } from "express";
import { createSnnit, getAllSnnit } from "../controllers/snnitCont";

const router = Router();

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
router.route("/").get(getAllSnnit);

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
router.route("/").post(createSnnit);

export default router;