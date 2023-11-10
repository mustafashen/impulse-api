import request from 'supertest';
import {app} from '../../src/app';
import { customer_login, customer_signup } from '../factories/customer-factory';
import { transporter } from '../../src/services/nodemailTransporter';
import { knex } from '../../src/db/knex';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')

describe('POST /signup', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({insert: jest.fn().mockReturnValue(1)})

    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    bcryptSpy.mockResolvedValue('mockHashedSecret')

    const transporterSpy = jest.spyOn(transporter, 'sendMail')
    transporterSpy.mockResolvedValue({MockSent: true})

    const res = await request(app).post('/client/customer/signup').send(customer_signup)
    expect(res.status).toBe(201)

  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /login', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnValue([{
        email: customer_login.customer.email,
        password: 'mockHashedSecret'
      }]),
      insert: jest.fn().mockReturnValue(1)
    })
    
    const bcryptSpy = jest.spyOn(bcrypt, 'compare')
    bcryptSpy.mockReturnValue(true)

    const response = await request(app).post('/client/customer/login').send(customer_login)
    expect(response.status).toBe(201)
  })
})


