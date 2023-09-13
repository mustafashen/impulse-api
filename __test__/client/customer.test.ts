import request from 'supertest';
import {app} from '../../src/app';
import { CustomerController } from '../../src/controllers/client/customerController';
import { mockInputsCustomer } from './__mocks__/mockInputsCustomer';
import { Server } from 'http';
import { mockCustomerAuth } from './__mocks__/mockCustomerAuth';
import { authenticateCustomer } from '../../src/middlewares/client/auth';
import { knex } from '../../src/db/knex';
import { testTables } from './__mocks__/knexTestTables';

const {signupInput, loginInput} = mockInputsCustomer

// Test if customer signup route creates a user
describe("Customer Signup", () => {
  let server: Server
  beforeEach(() => {
    knex.schema.createTable('customer', testTables.customerTestTable).catch((error: any) => console.log(error))
    server = app.listen(3000)
  })

  afterEach(() => {
    server.close()
    jest.restoreAllMocks()
  })

  it ('passes body to signup controller, returns success', async () => {

    const res = await request(server)
      .post('/customer/signup')
      .send(signupInput.body)
    
    expect(res.status).toBe(201)

    const inserted =  await knex('customer').where({email: signupInput.body.customer.email})
    expect(inserted).toHaveLength(1)
    
  })

})


// ** Auth Tests **
// Test if passing no token bypasses auth
// Test if passing token with wrong sign bypasses auth
// Test if passing token with the id that not in db bypasses auth
