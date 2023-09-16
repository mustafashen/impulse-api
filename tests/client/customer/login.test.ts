import request from 'supertest';
import {app} from '../../../src/app';
import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import { knex } from '../../../src/db/knex';
import { resetCustomerTable } from '../test-utils/resetCustomerTable';

const {signupInput, loginInput} = mockInputsCustomer

beforeAll(async () => {
  await knex('customer').delete()

  await request(app)
  .post('/customer/signup')
  .send(signupInput.body)
})

afterEach(async () => {
  jest.restoreAllMocks()
})

afterAll(resetCustomerTable)

describe("Customer Login", () => {
  it ('responds with a token to a valid login body', async () => {
    
    const res = await request(app)
      .post('/customer/login')
      .send(loginInput.body)
    expect(res.status).toBe(201)

    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    
    const accountsBefore = await knex('customer').where({email: loginInput.body.customer.email})
    expect(accountsBefore[0].tokens).toHaveLength(1)
    
  })

})


// ** Auth Tests **
// Test if passing no token bypasses auth
// Test if passing token with wrong sign bypasses auth
// Test if passing token with the id that not in db bypasses auth
