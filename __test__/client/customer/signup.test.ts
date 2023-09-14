import request from 'supertest';
import {app} from '../../../src/app';
import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import { knex } from '../../../src/db/knex';


const {signupInput, loginInput} = mockInputsCustomer

afterAll(async () => {
  await knex.destroy()
})


afterEach(async () => {
  jest.restoreAllMocks()
  await knex('customer').delete()
})

describe("Customer Signup", () => {

  it ('responds success to valid signup body', async () => {

    const res = await request(app)
      .post('/customer/signup')
      .send(signupInput.body)
    
    expect(res.status).toBe(201)

    const inserted =  await knex('customer').where({email: signupInput.body.customer.email})
    expect(inserted).toHaveLength(1)
    
  })

})