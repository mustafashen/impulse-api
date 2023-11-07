import request from 'supertest';
import {app} from '../../src/app';
import { customer_login, customer_signup } from '../factories/customer-factory';

describe('POST /signup', async () => {

  it ('should return 201', async () => {
    const response = await request(app).post('/signup').send(customer_signup)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('Success')
  })

})

// Needs signup route to create the factory user
describe('POST /login', async () => {
  it ('should return 200', async () => {
    const response = await request(app).post('/login').send(customer_login)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})

// rest of to customer routes depends on signup and login routes

