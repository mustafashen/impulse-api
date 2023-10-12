import request from 'supertest';
import {app} from '../../../src/app';
import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import { knex } from '../../../src/db/knex';
import { resetCustomerTable } from '../test-utils/resetTables';

const {signupInput, loginInput} = mockInputsCustomer

let accessToken = ''
beforeAll(async () => {
  // Signup
  await request(app)
  .post('/client/customer/signup')
  .send(signupInput.body)

  // Login
  const loginRes = await request(app)
  .post('/client/customer/login')
  .send(loginInput.body)

  accessToken = loginRes.body.token

  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
})

afterEach(async () => {
  jest.restoreAllMocks()
})

afterAll(resetCustomerTable)

describe('Customer Logout', () => {

  it ('deletes auth token on logout', async () => {

    const accountsBefore = await knex('customer').where({email: loginInput.body.customer.email})
    expect(accountsBefore[0].tokens).toHaveLength(1)

    const logoutRes = await request(app)
      .delete('/client/customer/logout')
      .set('Authorization', accessToken) 
    expect(logoutRes.status).toBe(200)

    const accountsAfter= await knex('customer').where({email: loginInput.body.customer.email})
    expect(accountsAfter[0].tokens).toHaveLength(0)
  })

})