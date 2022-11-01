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
 *@swagger
 * paths:
 *  /api/v1/employees/:
 *    get:
 *      description: Use to get all employees
 *      responses:
 *        '200':
 *          description: All employees that exist
 */

router.route("/").get(getAllEmployees);


router.route('/').post(createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

export default router;
