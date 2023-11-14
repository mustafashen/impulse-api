import request from 'supertest';
import {app} from '../../src/app';
import { knex } from '../../src/db/knex';
import { stripe } from '../../src/utils/payment/stripe/stripe';
import { checkout_cart } from '../factories/checkout-factory';
const jwt = require('jsonwebtoken')


jest.mock('../../src/db/knex')
jest.mock('../../src/utils/payment/stripe/stripe')
jest.mock('uuid', () => ({ v4: () => '6de31bc8-9a89-4c82-b58b-0a6e4e9111cc' }))

describe('POST /client/checkout/cart', () => {
  it ('should return 200', async () => {

    knex.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn()
        .mockReturnValueOnce([{id: 'mockCustomerId'}])
        .mockReturnValueOnce([{token: 'mockAccessToken'}])
        .mockReturnValueOnce([{
          product_id: '0d815137-d500-426a-8bd5-2918a9fd2206',
          quantity: 11,
        }])
        .mockReturnValueOnce([{
          name: 'mockProductName',
          price: 100,
          stock: 12
        }])
        .mockReturnValueOnce([{
          address_id: '0d815137-d500-426a-8bd5-2918a9fd2206',
          customer_id: '0d815137-d500-426a-8bd5-2918a9fd2206',
          id: '0d815137-d500-426a-8bd5-2918a9fd2206',
        }]),
      insert: jest.fn()
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1),
    })

    const stripeSpy = jest.spyOn(stripe.checkout.sessions, 'create')
    stripeSpy.mockReturnValue({
      amount_total: 12,
      id: '0d815137-d500-426a-8bd5-2918a9fd220',
      url: 'mockCheckoutURL'
    })
    
    // Find a way to mock stripe
    const jwtSpy = jest.spyOn(jwt, 'verify')
    jwtSpy.mockReturnValue({id: 'mockDecodedCustomerId'})
    
    const response = await request(app)
      .post('/client/checkout/cart')
      .send(checkout_cart)
      .set('Authorization', `Bearer mockAccessToken`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({"checkout_url": "mockCheckoutURL"})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})