import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';

jest.mock('../../src/db/knex')

describe('GET /client/product/all', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnValue([{product_id: 'mockProductId', product_name: 'mockProductName'}])
    })
    
    const response = await request(app)
      .get('/client/product/all')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{product_id: 'mockProductId', product_name: 'mockProductName'}])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /client/product/category', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      where: jest.fn().mockReturnValue([{product_id: 'mockProductId', product_name: 'mockProductName'}]),
      orderBy: jest.fn().mockReturnThis()
    })
    
    const response = await request(app)
      .post('/client/product/category')
      .send({category: {category_id: 'mockCategoryId'}})
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{product_id: 'mockProductId', product_name: 'mockProductName'}])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('POST /client/product/id', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      where: jest.fn().mockReturnValue([{product_id: 'mockProductId', product_name: 'mockProductName'}]),
    })
    
    const response = await request(app)
      .post('/client/product/id')
      .send({category: {product_id: 'mockCategoryId'}})
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{product_id: 'mockProductId', product_name: 'mockProductName'}])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
