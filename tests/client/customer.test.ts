import request from 'supertest';
import {app} from '../../src/app';
import { customer_login, customer_signup } from '../factories/customer-factory';
import { CustomerModel } from '../../src/models/client/customerModel';
const {knex} = require('../../src/db/knex')


describe('POST /signup', () => {
  it ('should return 201', async () => {
    // TODO:
    // mocks work when we directly call the methods but not when it called indirectly
      // we need to fix this issue
      // desired mocking behavior we want to archive called monkey-patching 
      // one library might work is rewire but it only works with commonjs modules
    // we might consider writing tests for m,v,c separately in isolation this might make our job easier
    const spy = jest.spyOn(CustomerModel, 'createCustomer')
    spy.mockResolvedValue({Success: true})

    await request(app).post('/signup').send(customer_signup)
    expect(spy).toHaveBeenCalled()
  })

})

// Needs signup route to create the factory user
// describe('POST /login', async () => {
//   it ('should return 200', async () => {
//     const response = await request(app).post('/login').send(customer_login)
//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('token')
//   })
// })

// rest of to customer routes depends on signup and login routes

