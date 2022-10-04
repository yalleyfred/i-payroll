"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payslipController_1 = require("../controllers/payslipController");
const router = (0, express_1.Router)();
router.route('/')
    .get(payslipController_1.getAllPayslip)
    .post(payslipController_1.createPayslip);
router.route('/:id')
    .get(payslipController_1.getPayslip);
exports.default = router;
//# sourceMappingURL=payslipRoute.js.map