import request from 'supertest';
import {app} from '../../../src/app';
import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import { knex } from '../../../src/db/knex';
import { resetCustomerTable } from '../test-utils/resetTables';
import { createAccessToken } from '../test-utils/createAccessToken';

const {signupInput, loginInput} = mockInputsCustomer

let accessToken = ''
beforeAll(async () => {
  accessToken = await createAccessToken()
})

afterEach(async () => {
  jest.restoreAllMocks()
})

afterAll(resetCustomerTable)

describe('Customer Delete', () => {

  it ('deletes customer account', async () => {

    const accountsBefore = await knex('customer').where({email: loginInput.body.customer.email})
    expect(accountsBefore).toHaveLength(1)

    const logoutRes = await request(app)
      .delete('/client/customer/delete')
      .set('Authorization', accessToken)
      .send({password: loginInput.body.customer.password})
    expect(logoutRes.status).toBe(200)

    const accountsAfter = await knex('customer').where({email: loginInput.body.customer.email})
    expect(accountsAfter).toHaveLength(0)
  })

})