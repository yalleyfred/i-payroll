"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payrollCont_1 = require("../controllers/payrollCont");
const router = (0, express_1.Router)();
router.route("/").get(payrollCont_1.getAllPayroll).post(payrollCont_1.createPayroll);
router.route("/:id").get(payrollCont_1.getPayroll);
exports.default = router;
//# sourceMappingURL=payrollRoute.js.map