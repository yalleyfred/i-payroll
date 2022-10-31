import supertest from 'supertest'
import {app} from "../../app";


describe('get all snnit',() => {
    describe('given all snnit exist',() => {
        it('should return a 200', async() => {
            const response = await supertest(app).get('/api/v1/snnit').expect(200);
            // console.log(response.body);
            
          })
    })

    describe('should creating a new snnit fails', ()=> {
        it('return a 500', () => {
           supertest(app).post('/api/v1/snnit').expect(500);

         })
     })
})