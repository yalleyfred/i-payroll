import supertest from 'supertest'
import {app} from "../../app";
import User, { UserMap } from "../../model/userModel";
import * as userServices from "../../service/userService";
import { Database } from "../../Database";
describe('get all users',() => {
    describe('given all users exist',() => {
        it('should return a 200', async() => {
            const response = await supertest(app).get('/api/v1/users').expect(200);
          //   console.log(response.body);
            
          })
    })

    describe('should creating a new user fails', ()=> {
        it('return a 500', () => {
           supertest(app).post('/api/v1/users').expect(500);

         })
     })
})

describe('Testing the signin handler', () => {

    const res:any = {
      send: jest.fn(() => res),
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const next = jest.fn();
  
    test('Should find a User when a `user` is present on the request', async () => {
        UserMap(Database);
      let req = {
        user: await User.findOne({ where: { username: 'test' } }),
      }
  
    //   await handleSignin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({
            username: expect.any(String),
            password: expect.any(String),
            token: expect.any(String),
          }),
          token: expect.any(String),
        })
      );
    });
  
    test('Should trigger error handler when no user is present on the request', async () => {
      let req = {};
      jest.clearAllMocks();
  
    //   await handleSignin(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });