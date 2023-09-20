import { StaffModel } from "../../models/cms/staffModel_cms"
import { StaffType, StaffLoginType } from "../../types/StaffTypes"
import { generateAuthToken } from "../../utils/auth/generateAuthToken"
import { validateCreateStaffParams, validateLoginStaffParams } from "../../utils/validation/cms/staffValidation"
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
      if (!body.staff) throw "6000"
      const {staff} = body 
      // validate params
      const valid = validateLoginStaffParams(staff)
      if (!valid) throw "2000"
      // find user
      const foundUser = await StaffModel.readStaff(staff)
      if (foundUser.Error) throw foundUser.Error
      // compare hashes
      const doesMatch = await bcrypt.compare(staff.password, foundUser.password)
      if (!doesMatch) throw "1000"
      // generate authentication token and add to db
      const jwt = await generateAuthToken(foundUser.id)
      // return the auth token
      const resData = await StaffModel.addNewAuthToken(foundUser.id, jwt)
      if (resData.Error) throw resData.Error
      else if (resData.Success) return {token: jwt}
      else throw "Unexpected error during login"
    } catch (error) {
      return {Error: error}
    }
  }

}

export {
  StaffController
}