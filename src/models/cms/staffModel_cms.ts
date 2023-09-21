import { knex } from "../../db/knex"
import {StaffType, StaffLoginType} from "../../types/StaffTypes"

const StaffModel = {

  createStaff: async (staff: StaffType) => {
    try {
      const res = await knex('staff').insert(staff)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  readStaff: async (staff: StaffLoginType) => {
    try {
      const res = await knex('staff').select('id', 'email', 'password').where({email: staff.email})
      if (res.length === 0 || res === 0) throw "4004"
      return res[0]
    } catch (error: any) {
      if (error.code) return {Error: error.code}
      return {Error: error}
    }
  },

  addNewAuthToken: async (staffId: string, token: string) => {
    try {
      console.log(staffId)
      const tokensCol = await knex('staff').where({id: staffId})
      console.log(tokensCol)
      const currentTokens = tokensCol[0].tokens
 
      const res = await knex('staff')
        .where({id: staffId})
        .update({'tokens': [...currentTokens, token]})
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: "true"}

    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  }
}

export {
  StaffModel
}