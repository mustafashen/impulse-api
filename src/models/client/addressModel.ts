import { knex } from "../../db/knex"
import { AddressType } from "../../types/AddressTypes"


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
  }
}

export {
  AddressModel
}