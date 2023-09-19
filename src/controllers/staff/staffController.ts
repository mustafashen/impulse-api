import { StaffModel } from "../../models/staff/staffModel"
import { StaffType, StaffLoginType } from "../../types/StaffTypes"
import { validateCreateStaffParams } from "../../utils/validation/staff/createStaff"
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const StaffController = {
  postCreateStaff: async (body: {staff: StaffType}) => {
    try {
      if (!body.staff) throw "6000"
      const {staff} = body
      staff.id = uuidv4()
      staff.tokens = []

      const valid = validateCreateStaffParams(staff)
      if (!valid) throw "2000"

      staff.password = await bcrypt.hash(staff.password, 10)
      
      const resData = await StaffModel.createStaff(staff)
      if (resData?.Error) throw resData.Error 
      return resData
    } catch (error) {
      return {Error: error}
    }
  },

  postLoginStaff: async (body: {staff: StaffLoginType}) => {
    try {
      // validate params
      // find user
      // compare hashes
      // generate authentication token and add to db
      // return the auth token
    } catch (error) {
      
    }
  }

}

export {
  StaffController
}