"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeesCont_1 = require("../controllers/employeesCont");
const router = (0, express_1.Router)();
/**
 *@swagger
 * paths:
 *  /api/v1/employees/:
 *    get:
 *      description: Use to get all employees
 *      responses:
 *        '200':
 *          description: All employees that exist
 */
router.route("/").get(employeesCont_1.getAllEmployees);
router.route('/').post(employeesCont_1.createEmployee);
router
    .route("/:id")
    .get(employeesCont_1.getEmployee)
    .patch(employeesCont_1.updateEmployee)
    .delete(employeesCont_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employeeRoute.js.map