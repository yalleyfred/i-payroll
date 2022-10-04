"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payrollController_1 = require("../controllers/payrollController");
const router = (0, express_1.Router)();
router.route('/')
    .get(payrollController_1.getAllPayroll)
    .post(payrollController_1.createPayroll);
exports.default = router;
//# sourceMappingURL=payrollRoute.js.map