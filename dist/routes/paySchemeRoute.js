"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paySchemeCont_1 = require("../controllers/paySchemeCont");
const router = (0, express_1.Router)();
router.route('/')
    .get(paySchemeCont_1.getAllPay)
    .post(paySchemeCont_1.createPay);
exports.default = router;
//# sourceMappingURL=paySchemeRoute.js.map