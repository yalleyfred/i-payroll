"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payslipCont_1 = require("../controllers/payslipCont");
const router = (0, express_1.Router)();
router.route("/").get(payslipCont_1.getAllPayslip).post(payslipCont_1.createPayslip);
router.route("/:id").get(payslipCont_1.getPayslip);
exports.default = router;
//# sourceMappingURL=payslipRoute.js.map