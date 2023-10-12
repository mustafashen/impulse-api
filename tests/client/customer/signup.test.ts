import request from 'supertest';
import {app} from '../../../src/app';
import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import { knex } from '../../../src/db/knex';
import { resetCustomerTable } from '../test-utils/resetTables';

// TODO: update tests for new schema changes
const {signupInput, loginInput} = mockInputsCustomer

afterEach(async () => {
  jest.restoreAllMocks()
})

afterAll(resetCustomerTable)

describe("Customer Signup", () => {

  it ('responds success to valid signup body', async () => {

    const res = await request(app)
      .post('/client/customer/signup')
      .send(signupInput.body)
    
    expect(res.status).toBe(201)

    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    
    const inserted =  await knex('customer').where({email: signupInput.body.customer.email})
    expect(inserted).toHaveLength(1)
    
  })

})