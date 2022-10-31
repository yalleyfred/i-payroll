import supertest from 'supertest'
import {app} from "../../app";


describe('get all payroll',() => {
    describe('given all payroll exist',() => {
        it('should return a 200', async() => {
            const response = await supertest(app).get('/api/v1/payroll').expect(200);
          //   console.log(response.body);
            
          })
    })

    describe('should creating a new payroll fails', ()=> {
        it('return a 500', () => {
           supertest(app).post('/api/v1/payroll').expect(500);

         })
     })
})