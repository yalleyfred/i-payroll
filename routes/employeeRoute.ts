import { Router } from "express";
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeesCont";
const router = Router();
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

router.route("/").get(getAllEmployees);

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
router.route("/").post(createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

export default router;
