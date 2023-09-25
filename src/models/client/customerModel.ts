import {knex} from "../../db/knex"
import {CustomerType, CustomerUpdateType} from "../../types/CustomerTypes"

const CustomerModel = {

  createCustomer: async (customer: CustomerType) => {
    try {
      const res = await knex('customer').insert(customer)
      if (res.length === 0 || res === 0) throw "4004" 
      return {Success: true}
      
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  findCustomer: async ({email, id}: {email?: string, id?: string}) => {
    try {
      if (email) {
        const res = await knex('customer').where({email: email})
        if (res.length === 0 || res === 0) throw "4004" 
        return res
      } else if (id) {
        const res = await knex('customer').where({id: id})
        if (res.length === 0 || res === 0) throw "4004" 
        return res
      }

    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  addNewAuthToken: async (newToken: {id: string, customerId: string, token: string}) => {
    try {
      console.log(newToken)
      const {id, customerId, token} = newToken
      const res = await knex('customer_token').insert({id, token, customer_id: customerId})
      console.log(res)
      if (res.length === 0 || res === 0) throw "4004" 
      return {Success: true}

    } catch (error: any) {
      console.log(error)
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteAuthToken: async (customerId: string, token: string) => {
    try {
      const res = await knex('customer_token').delete().where({customer_id: customerId, token})
      if (res.length === 0 || res === 0) throw "4004" 
      return {Success: true}
      
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteCustomer: async (customerId: string) => {
    try {
      const res = await knex('customer').where({id: customerId}).del()
      if (res.length === 0 || res === 0) throw "4004" 
      return {Success: true}

    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  updateCustomer: async (body: {customer: CustomerUpdateType, id: string}) => {
    const {customer} = body
    try {
      const res = await knex('customer').where({id: body.id}).update({...customer.updates})
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  }
}

export  {CustomerModel}