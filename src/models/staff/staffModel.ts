import { knex } from "../../db/knex"
import {StaffType} from "../../types/StaffTypes"

const StaffModel = {

  createStaff: async (staff: StaffType) => {
    try {
      const res = await knex('staff').insert(staff)
      if (res.length === 0) throw "3000"
      return {Success: true}
    } catch (error: any) {
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  }
}

export {
  StaffModel
}