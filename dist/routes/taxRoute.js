"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxCont_1 = require("../controllers/taxCont");
const router = (0, express_1.Router)();
router.route("/").get(taxCont_1.getAllTax).post(taxCont_1.createTax);
exports.default = router;
//# sourceMappingURL=taxRoute.js.map