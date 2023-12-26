const { v4: uuidv4 } = require('uuid')
import { CustomerModel } from "../../models/client/customerModel"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { CustomerType, CustomerUpdateType } from "../../types/CustomerTypes"
import { generateAuthToken } from "../../utils/auth/generateAuthToken"
import { sendActivationMail } from "../../utils/confirmation/sendConfirmationMail"
import {
  validateCustomerLoginParams,
  validateCustomerLogoutParams,
  validateCustomerSignupParams,
  validateCustomerUpdateParams, } from "../../utils/validation/client/customerValidation"



const CustomerController = {
  postSignupCustomer: async (body: {customer: CustomerType}) => {
    try {
      const {customer} = body
      customer.id = uuidv4()
      const valid = validateCustomerSignupParams(customer)
      if (!valid) throw "4022"

      customer.is_active = false
      customer.password = await bcrypt.hash(customer.password, 10)
      const resData = await CustomerModel.createCustomer(customer)
      if (resData?.Error) throw resData.Error

      const activationToken = await generateAuthToken(customer.id)
      const emailSendRes = await sendActivationMail({name: customer.name, to: customer.email, token: activationToken})
      if (emailSendRes?.Error) throw emailSendRes.Error

      return resData

    } catch (error) {
      console.log(error)
      return {Error: error} 
    }
  },

  postLoginCustomer: async (body: {customer: {email: string, password: string}}) => {
    try {
      const {customer} = body
      const valid = validateCustomerLoginParams(customer)
      if (!valid) throw "4022"

      const searchResult = await CustomerModel.findCustomer({email: customer.email})
      if (searchResult?.Error) throw searchResult.error
      else if (searchResult.length === 0) throw "4004"

      const isMatch = await bcrypt.compare(customer.password, searchResult[0].password)
      if (!isMatch) throw "4001"

      const token = await generateAuthToken(searchResult[0].id)
      CustomerModel.addNewAuthToken({customerId: searchResult[0].id, token, id: uuidv4()})
      return {token}
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  deleteLogoutCustomer: async (body: {token: string, id: string}) => {
    try {
      const valid = validateCustomerLogoutParams(body)
      if (!valid) throw "4022"
      const resData = await CustomerModel.deleteAuthToken(body.id, body.token)
      if (resData?.Error) throw resData.Error
      
      return resData
    } catch (error) {
      return {Error: error}
    }
  },
  
  deleteAccountCustomer: async (body: {token: string, id: string, password: string}) => {
    try {
      const searchResult = await CustomerModel.findCustomer({id: body.id})
      if (searchResult?.Error) throw searchResult.Error
      
      const isMatch = await bcrypt.compare(body.password, searchResult[0].password)
      if (!isMatch) throw "4001"

      const resData = await CustomerModel.deleteCustomer(body.id)
      if (resData?.Error) throw resData.Error
      
      return resData
    } catch (error) {
      return {Error: error}
    }
  },

  updateCustomer: async (body: {id: string, customer: CustomerUpdateType}) => {
    try {
      console.log(body)
      if (!body.customer) throw "4000"
      const {customer} = body

      const valid = validateCustomerUpdateParams(customer)
      if (!valid) throw "4002"

      const searchResult = await CustomerModel.findCustomer({id: body.id})
      if (searchResult?.Error) throw searchResult.Error
      else if (searchResult.length === 0) throw "4004"

      const isMatch = await bcrypt.compare(customer.password, searchResult[0].password)
      if (!isMatch) throw "4001"

      if (customer.updates.password) customer.updates.password = await bcrypt.hash(customer.updates.password, 10)

      const resData = await CustomerModel.updateCustomer(body)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log('updateCustomerController', error)
      return {Error: error}
    }
  },

  getCustomerName: async (body: {customer: {id: string}}) => {
    try {
      if (!body.customer) throw "4000"

      const resData = await CustomerModel.findCustomer(body.customer)
      if (resData?.Error) throw resData.Error
      else if (resData.length === 0) throw "4004"
      return {
        customer: {
          name: resData[0].name
      }}
      
    } catch (error: any) {
      console.log('updateCustomerController', error)
      return {Error: error}
    }
  },

  getCustomerInfo: async (body: {id: string}) => {
    try {
      if (!body.id) throw "4000"

      const resData = await CustomerModel.findCustomer({id: body.id})
      if (resData?.Error) throw resData.Error
      else if (resData.length === 0) throw "4004"
      return {
        customer: {
          id: resData[0].id,
          name: resData[0].name,
          last_name: resData[0].last_name,
          email: resData[0].email,
          phone: resData[0].phone,
          birth_date: resData[0].birth_date,
          gender: resData[0].gender,
          is_active: resData[0].is_active,
      }}
      
    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  },

  activateCustomer: async (token: string) => {
    try {
      if (!token) throw "4000"

      const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
      if (!decodedJWT.id) throw "4000"

      const resData = await CustomerModel.activateCustomer(decodedJWT.id)
      if (resData?.Error) throw resData.Error
      return resData

    } catch (error) {
      console.log('activateCustomerController', error)
      return {Error: error}
    }
  }
}


export {
  CustomerController
}