import supertest from 'supertest'
import {app} from "../../app";


describe('get all loan',() => {
    describe('given all loan exist',() => {
        it('should return a 200', async() => {
            const response = await supertest(app).get('/api/v1/loan').expect(200);
            // console.log(response.body);
            
          })
    })

    describe('should creating a new loan fails', ()=> {
        it('return a 500', () => {
           supertest(app).post('/api/v1/loan').expect(500);

         })
     })
})