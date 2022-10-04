import { Router } from 'express';
import { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeesController';
const router = Router();

router.route('/')
.get(getAllEmployees)
.post(createEmployee);

router.route('/:id')
.get(getEmployee)
.patch(updateEmployee)
.delete(deleteEmployee);

export default router;