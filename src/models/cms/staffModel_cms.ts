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
  },

  deleteAccountStaff: async (staff: {id: string}) => {
    try {
      const res = await knex('staff').where({id: staff.id}).delete()
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: "true"}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteAuthToken: async (staffId: string, token: string) => {
    try {
      const tokensCol = await knex('staff').where({id: staffId}).select('tokens')
      const currentTokens = tokensCol[0].tokens

      const newTokens = currentTokens.filter((t: string) => t !== token)
      const res = await knex('staff')
      .where({id: staffId})
      .update({['tokens']: [...newTokens]})
      if (res.length === 0 || res === 0) throw "4004" 
      return {Success: true}

    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },
  
}

export {
  StaffModel
}