import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { address_create } from '../factories/address-factory';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')

describe('POST /client/address/create', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}]),
      insert: jest.fn().mockReturnValueOnce(1)
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/address/create')
      .send(address_create)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})