import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { staff_create, staff_login, staff_update } from '../factories/staff-factory';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')

describe('POST /cms/staff/create', () => {
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

    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    bcryptSpy.mockResolvedValue('mockHashedSecret')
    
    const response = await request(app)
      .post('/cms/staff/create')
      .send(staff_create)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /cms/staff/login', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValue([{id: 'mockStaffId', password: 'mockStaffSecret'}]),
      insert: jest.fn().mockReturnValue(1)
      })

    const jwtSpy = jest.spyOn(jwt, 'sign')
    jwtSpy.mockReturnValue({id: 'mockAccessToken'})

    const bcryptSpy = jest.spyOn(bcrypt, 'compare')
    bcryptSpy.mockResolvedValue(true)
    
    const response = await request(app)
      .post('/cms/staff/login')
      .send(staff_login)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({"token": "mockAccessToken"})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /cms/staff/logout', () => {
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
      .delete('/cms/staff/logout')
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /cms/staff/delete', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockAdminId', isAdmin: true}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{isAdmin: false}])
        .mockReturnValueOnce(1),
      delete: jest.fn().mockReturnThis()
      })

      const jwtSpy = jest.spyOn(jwt, 'verify')
      jwtSpy.mockReturnValue({id: 'aa9b119d-3cd0-4980-96dc-4c5bf0ece443'})

    const response = await request(app)
      .delete('/cms/staff/delete')
      .send({staff: {id: 'aa9b119d-3cd0-4980-96dc-4c5bf0ece443'}})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('PUT /cms/staff/update', () => {
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
      .put('/cms/staff/update')
      .send(staff_update)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})