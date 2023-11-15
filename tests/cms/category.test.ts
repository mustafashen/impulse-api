import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { category_create, category_delete, category_update } from '../factories/category-factory';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')
jest.mock('uuid', () => ({ v4: () => '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc' }))

describe('POST /cms/category/create', () => {
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
      .post('/cms/category/create')
      .send(category_create)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /cms/category/delete', () => {
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
      .delete('/cms/category/delete')
      .send(category_delete)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('PUT /cms/category/update', () => {
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
      .put('/cms/category/update')
      .send(category_update)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})