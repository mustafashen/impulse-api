import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')
jest.mock('uuid', () => ({ v4: () => '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc' }))

describe('POST /client/wishlist/list', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{
          customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc',
          id: 'mockWishlistLineId',
        }])
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/wishlist/list')
      .send({wishlist: {id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{
      "customer_id": "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
      "id": "mockWishlistLineId"}])
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/wishlist/create', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce({noWishlistFound: true}),
      insert: jest.fn().mockReturnValue(1)
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/wishlist/create')
      .send({})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      "customer_id": "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
      "id": "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc"
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/wishlist/line-toggle', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([]),
      insert: jest.fn().mockReturnValue(1)
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/wishlist/line-toggle')
      .send({
        wishlist_line: {
          id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
          product_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
          wishlist_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc"
        }
      })
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})