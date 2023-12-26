import { knex } from "../../db/knex"
import { AddressType, AddressUpdateType } from "../../types/AddressTypes"


const AddressModel = {

  createAddress: async (address: AddressType) => {
    try {
      const res = await knex('address').insert({...address})
      if (res.length === 0 || res === 0) return {Warning: 'No changes made'}
      return {Success: true}
    } catch (error: any) {
      console.log(error)
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  readAddress: async (id: string) => {
    try {
      const res = await knex('address').where({customer_id: id})
      return res
    } catch (error: any) {
      console.log(error)
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteAddress: async ({customer_id, id}: {customer_id: string, id: string}) => {
    try {
      const res = await knex('address').where({id, customer_id}).delete()
      if (res.length === 0 || res === 0) return {Warning: 'No changes made'}
      return {Success: true}
    } catch (error: any) {
      console.log(error)
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  updateAddress: async ({id, updates}: AddressUpdateType) => {
    try {
      const res = await knex('address').update({...updates}).where({id})
      if (res.length === 0 || res === 0) return {Warning: 'No changes made'}
      return {Success: true}
    } catch (error: any) {
      console.log(error)
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },
}

export {
  AddressModel
}