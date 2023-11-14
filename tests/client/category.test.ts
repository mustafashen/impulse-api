import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';

jest.mock('../../src/db/knex')

describe('GET /client/category/all', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnValue([{category_id: 'mockCategoryId', category_name: 'mockCategoryName'}])
    })
    
    const response = await request(app)
      .get('/client/category/all')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{category_id: 'mockCategoryId', category_name: 'mockCategoryName'}])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})

describe('GET /client/category/parent', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnValue([{category_id: 'mockCategoryId', category_name: 'mockCategoryName'}])
    })
    
    const response = await request(app)
      .post('/client/category/parent')
      .send({category: {id: 'mockParentId'}})
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{category_id: 'mockCategoryId', category_name: 'mockCategoryName'}])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})