import { knex } from "../../db/knex"
import { AddressType } from "../../types/AddressTypes"


const AddressModel = {

  createAddress: async (address: AddressType) => {
    try {
      console.log(address)
      const res = await knex('address').insert({...address})
      if (res.length === 0 || res === 0) throw "4004"
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