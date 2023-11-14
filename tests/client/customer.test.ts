import request from 'supertest';
import {app} from '../../src/app';
import { customer_delete, customer_login, customer_logout, customer_signup, customer_update } from '../factories/customer-factory';
import { transporter } from '../../src/services/nodemailTransporter';
import { knex } from '../../src/db/knex';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')

describe('POST /client/customer/signup', () => {
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
    jest.restoreAllMocks()
  })
})

describe('POST /client/customer/login', () => {
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

    const jwtSpy = jest.spyOn(jwt, 'sign')
    jwtSpy.mockReturnValue('mockJWT')

    const response = await request(app).post('/client/customer/login').send(customer_login)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({token: 'mockJWT'})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('DELETE /client/customer/logout', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockCustomerId'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce(1),
      delete: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .delete('/client/customer/logout')
      .send(customer_logout)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('DELETE /client/customer/delete', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockCustomerId'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{id: 'mockCustomerId', password: "32sdlkfj32"}])
        .mockReturnValueOnce(1),
      delete: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})

    const bcryptSpy = jest.spyOn(bcrypt, 'compare')
    bcryptSpy.mockResolvedValue(true)
    
    const response = await request(app)
      .delete('/client/customer/delete')
      .send(customer_delete)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('PUT /client/customer/update', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockCustomerId'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{id: 'mockCustomerId', password: "32sdlkfj32"}])
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})

    const bcryptSpy = jest.spyOn(bcrypt, 'compare')
    bcryptSpy.mockResolvedValue(true)
    
    const response = await request(app)
      .put('/client/customer/update')
      .send(customer_update)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('PUT /client/customer/activate', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockCustomerId'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .get('/client/customer/activate/?token="mockAccessToken"')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})