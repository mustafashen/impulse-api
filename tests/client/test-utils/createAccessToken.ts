import { mockInputsCustomer } from './../__mocks__/mockInputsCustomer';
import request from 'supertest';
import {app} from '../../../src/app';

const {signupInput, loginInput} = mockInputsCustomer

async function createAccessToken() {
    // Signup
    await request(app)
    .post('/client/customer/signup')
    .send(signupInput.body)
  
    // Login
    const loginRes = await request(app)
    .post('/client/customer/login')
    .send(loginInput.body)
  
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    return loginRes.body.token
}

export {
  createAccessToken
}