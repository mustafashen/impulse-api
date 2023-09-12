import request from 'supertest';
import {app} from '../../src/app';
import { CustomerController } from '../../src/controllers/client/customerController';
import { mockInputsCustomer } from './__mocks__/mockInputsCustomer';
import { Server } from 'http';
import { mockCustomerAuth } from './__mocks__/mockCustomerAuth';


const {signupInput, loginInput} = mockInputsCustomer

describe("Customer Routes", () => {
  let server: Server

  beforeEach(() => {
    server = app.listen(3000)
  })

  afterEach(() => {
    server.close()
    jest.restoreAllMocks()
  })

  it ('passes body to signup controller, returns success', async () => {
    const mockController = jest.spyOn(CustomerController, 'postSignupCustomer')
    mockController.mockImplementation(() => Promise.resolve({
      Success: true
    }))

    const res = await request(server)
      .post('/customer/signup')
      .send(signupInput.body)
    
    expect(mockController).toBeCalledWith(signupInput.body)
    expect(res.status).toBe(201)
  })

  it ('passes body to login controller, returns token', async () => {
    const mockController = jest.spyOn(CustomerController, 'postLoginCustomer')
    mockController.mockImplementation(() => Promise.resolve({
      token: "some token"
    }))

    const res = await request(server)
      .post('/customer/login')
      .send(loginInput.body)

    expect(mockController).toBeCalledWith(loginInput.body)
    expect(res.status).toBe(201)
  })

  it ('passes token to logout controller, returns success', async () => {
    
    const res = await request(server)
      .delete('/customer/logout')
      .set('Authorization', 'some token')
  })
})