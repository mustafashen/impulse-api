import { knex } from "../../db/knex"
import {StaffType, StaffLoginType, StaffUpdateType} from "../../types/StaffTypes"

const StaffModel = {

  createStaff: async (staff: StaffType) => {
    try {
      const res = await knex('staff').insert(staff)
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
      return res
    } catch (error: any) {
      if (error.code) return {Error: error.code}
      return {Error: error}
    }
  },

  updateStaff: async (body: StaffUpdateType) => {
    try {
      const res = await knex('staff').update(body.updates).where({id: body.id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
      return {Success: true}
    } catch (error: any) {
      if (error.code) return {Error: error.code}
      return {Error: error}
    }
  },

  addNewAuthToken: async (newToken: {id: string, staffId: string, token: string}) => {
    try {
      const {id, staffId, token} = newToken
      const res = await knex('staff_token').insert({id, token, staff_id: staffId})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
      const res = await knex('staff').delete().where({id: staff.id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteAuthToken: async (staffId: string, token: string) => {
    try {
      const res = await knex('staff_token').delete().where({staff_id: staffId, token})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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