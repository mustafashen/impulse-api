import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')
jest.mock('uuid', () => ({ v4: () => '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc' }))

describe('POST /client/review/customer-reviews', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce({id: 'mockReviewId'})
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/review/customer-reviews')
      .send({review: {customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({id: 'mockReviewId'})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})


describe('POST /client/review/product-reviews', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce({id: 'mockReviewId'})
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/review/product-reviews')
      .send({review: {product_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({id: 'mockReviewId'})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/review/create', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}]),
      insert: jest.fn().mockReturnValue(1),
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/review/create')
      .send({
        review: {
          rating: 5,
          comment: 'mockComment',
          product_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc',
          customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'
        }})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/review/update', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis(),
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .put('/client/review/update')
      .send({
        review: {
          id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc',
          updates: {
            rating: 5,
            comment: 'mockComment',
          }
        }})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('POST /client/review/delete', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{customer_id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce(1),
      delete: jest.fn().mockReturnThis(),
    })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .delete('/client/review/delete')
      .send({
        review: {
          id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'
        }})
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})