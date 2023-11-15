import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { shipment_add } from '../factories/shipment-factory';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../src/db/knex')

describe('PUT /cms/shipment/add', () => {
  it ('should return 201', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockAdminId', isAdmin: true}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1),
      update: jest.fn().mockReturnThis()
      })

    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'aa9b119d-3cd0-4980-96dc-4c5bf0ece443'})

    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    bcryptSpy.mockResolvedValue('mockHashedSecret')
    
    const response = await request(app)
      .put('/cms/shipment/add')
      .send(shipment_add)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({Success: true})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})