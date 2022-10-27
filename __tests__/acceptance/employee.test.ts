import { request } from 'http';
import supertest from 'supertest'
import {app} from "../../app";
import { createEmployee } from '../../controllers/employeesCont';
import Employee, {EmployeeMap} from '../../model/employeeModel';

const empPayload = {
    name: 'Daniel',
    email: "daniel@gmail.com",
    hire_date: '2021-04-08',
    snnit: '6416718979878',
    tin: '641671897987844',
    department: 'Tech',
    job_title: 'level 2',
    status: 'Full-Time'
}

const createEmployees = async(emp:Employee) => {
    // try {
    //     await Employee.create(emp)
    // }catch(error) {

    // }
} 


describe('employees', () => {
    describe('get all employees route', () => {
       describe('given all employee exist', ()=> {
           it('should return a 200', async() => {
              const response = await supertest(app).get('/api/v1/employees').expect(200);
            //   console.log(response.body);
              
            })
        })

        describe('should creating a new employee fails', ()=> {
            it('return a 500', () => {
               supertest(app).post('/api/v1/employees').expect(500);

             })
         })

         describe('creating a new employee', ()=> {
            it('should return a 201', async() => {
                // const employee = await createEmployees(empPayload)


               const response = await supertest(app).post('/api/v1/employees').send(empPayload);
                expect(response.statusCode).toBe(201);
                
             })
         })
    })
})