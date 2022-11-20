"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paySchemeCont_1 = require("../controllers/paySchemeCont");
const router = (0, express_1.Router)();
/**
 *@openapi
 *  /api/v1/payScheme:
 *    get:
 *      tags:
 *        - Payscheme
 *      summary: Get all payscheme
 *      responses:
 *        200:
 *          description: All payscheme that exist
 *        500:
 *          description: Bad request
 */
router.route("/").get(paySchemeCont_1.getAllPay);
router.route("/").post(paySchemeCont_1.createPay);
exports.default = router;
//# sourceMappingURL=paySchemeRoute.js.map