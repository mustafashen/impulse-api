import request from 'supertest';
import {app} from '../../src/app';
import { generateAuthToken } from '../../src/utils/auth/generateAuthToken';
import { authenticateCustomer } from '../../src/middlewares/client/auth';
import {Request, Response, NextFunction} from "express"
import { CustomerController } from '../../src/controllers/client/customerController';


describe("Customer Routes", () => {
  
  const signupInput = {
    "body" : {
      "customer": {
        "name": "Somename",
        "last_name": "Somelastname",
        "birth_date": "1990-12-12",
        "email": "some@email.com",
        "password": "abc123dfe",
        "phone": "+123456789123",
        "gender": "Any",
        "address": "Somewhere there",
        "city": "Some city",
        "province": "Some province",
        "country": "Some country",
        "zip_code": "12345"
      }
    }
  }

  it ('passes body to controller, returns success', async () => {
    const mockController = jest.spyOn(CustomerController, 'postSignupCustomer')
    mockController.mockImplementation(() => Promise.resolve({
      Success: true
    }))

    const res = await request(app)
      .post('/customer/signup')
      .send(signupInput.body)
    
    expect(mockController).toBeCalledWith(signupInput.body)
    expect(res.status).toBe(201)
  })

})