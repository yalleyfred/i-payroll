"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeesController_1 = require("../controllers/employeesController");
const router = (0, express_1.Router)();
router.route('/')
    .get(employeesController_1.getAllEmployees)
    .post(employeesController_1.createEmployee);
router.route('/:id')
    .get(employeesController_1.getEmployee)
    .patch(employeesController_1.updateEmployee)
    .delete(employeesController_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employeesRoute.js.map