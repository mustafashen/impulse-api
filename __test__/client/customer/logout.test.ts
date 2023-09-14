import request from 'supertest';
import {app} from '../../../src/app';
import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import { knex } from '../../../src/db/knex';

const {signupInput, loginInput} = mockInputsCustomer

let accessToken = ''
beforeAll(async () => {

  // Signup
  await request(app)
  .post('/customer/signup')
  .send(signupInput.body)

  // Login
  const res = await request(app)
  .post('/customer/login')
  .send(loginInput.body)

  accessToken = res.body
})

afterAll(async () => {
  await knex('customer').delete()
  await knex.destroy()
})

afterEach(async () => {
  jest.restoreAllMocks()
})

describe('Customer Logout', () => {

  it ('deletes auth token on logout', async () => {
    // this query gets executed before the queries in beforeAll. find a way to fix it
    const tokensCol = await knex('customer').where({email: 'some@email.com'})
    const currentTokens = tokensCol[0]
  })

})