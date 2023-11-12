import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { address_create } from '../factories/address-factory';
import { cart_create, cart_line_create, cart_line_delete, cart_line_list, cart_line_update, cart_update } from '../factories/cart-factory';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('uuid', () => ({ v4: () => '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc' }))
jest.mock('../../src/db/knex')

describe('POST /client/cart/list', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{id: "mockCartId"}]),
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/cart/list')
      .send(cart_line_list)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{id: "mockCartId"}])
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/cart/create', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([]),
      insert: jest.fn().mockReturnValueOnce(1),
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/cart/create')
      .send(cart_create)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({cart_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('PUT /client/cart/update', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .put('/client/cart/update')
      .send(cart_update)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/cart/line-create', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{
          customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc',
          cart_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'
        }])
        .mockReturnValueOnce([]),
      insert: jest.fn().mockReturnValue(1)
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/cart/line-create')
      .send(cart_line_create)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('DELETE /client/cart/line-delete', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{
          customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc',
          cart_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'
        }])
        .mockReturnValueOnce(1),
      delete: jest.fn().mockReturnThis()
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .delete('/client/cart/line-delete')
      .send(cart_line_delete)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('PUT /client/cart/line-update', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{
          customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc',
          cart_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'
        }])
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis()
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .put('/client/cart/line-update')
      .send(cart_line_update)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('GET /client/cart/find-customer-cart', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce({cart_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc"}),
      update: jest.fn().mockReturnThis()
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .get('/client/cart/find-customer-cart')
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({cart_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc"})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})