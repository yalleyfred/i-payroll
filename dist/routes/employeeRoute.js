"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeesCont_1 = require("../controllers/employeesCont");
const router = (0, express_1.Router)();
/**
 *@openapi
 *  /api/v1/employees:
 *    get:
 *      tags:
 *        - Employees
 *      summary: Get all employees
 *      responses:
 *        200:
 *          description: All employees that exist
 *        500:
 *          description: Bad request
 */
router.route("/").get(employeesCont_1.getAllEmployees);
/**
 * @openapi
 * '/api/v1/employees':
 *    post:
 *      tags:
 *        - Employees
 *      summary: Create Employee
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateEmployeeInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreateEmployeeResponse'
 *         500:
 *            description: Bad request
 */
router.route("/").post(employeesCont_1.createEmployee);
router
    .route("/:id")
    .get(employeesCont_1.getEmployee)
    .patch(employeesCont_1.updateEmployee)
    .delete(employeesCont_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employeeRoute.js.map