import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { product_create, product_delete, product_update } from '../factories/product-factory';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')
jest.mock('uuid', () => ({ v4: () => '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc' }))

describe('POST /cms/product/create', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockAdminId', isAdmin: true}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce(1),
      insert: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'aa9b119d-3cd0-4980-96dc-4c5bf0ece443'})
    
    const response = await request(app)
      .post('/cms/product/create')
      .send(product_create)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /cms/product/delete', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockAdminId', isAdmin: true}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce(1),
      delete: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'aa9b119d-3cd0-4980-96dc-4c5bf0ece443'})
    
    const response = await request(app)
      .delete('/cms/product/delete')
      .send(product_delete)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('PUT /cms/product/update', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockAdminId', isAdmin: true}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'aa9b119d-3cd0-4980-96dc-4c5bf0ece443'})
    
    const response = await request(app)
      .put('/cms/product/update')
      .send(product_update)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})