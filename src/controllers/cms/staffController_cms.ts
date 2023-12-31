import { knex } from "../../db/knex"
import { StaffModel } from "../../models/cms/staffModel_cms"
import { StaffType, StaffLoginType, StaffUpdateType } from "../../types/StaffTypes"
import { generateAuthToken } from "../../utils/auth/generateAuthToken"
import { 
  validateCreateStaffParams, 
  validateLoginStaffParams,
  validateDeleteStaffParams,
  validateStaffLogoutParams, 
  validateStaffUpdateParams} from "../../utils/validation/cms/staffValidation"
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const StaffController = {
  postCreateStaff: async (body: {staff: StaffType}) => {
    try {
      if (!body.staff) throw "4000"
      const {staff} = body
      staff.id = uuidv4()
      
      const valid = validateCreateStaffParams(staff)
      if (!valid) throw "4022"

      staff.password = await bcrypt.hash(staff.password, 10)
      
      const resData = await StaffModel.createStaff(staff)
      if (resData?.Error) throw resData.Error 
      return resData
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  postLoginStaff: async (body: {staff: StaffLoginType}) => {
    try {
      if (!body.staff) throw "4000"
      const {staff} = body 
      // validate params
      const valid = validateLoginStaffParams(staff)
      if (!valid) throw "4022"
      // find user
      const foundUser = await StaffModel.readStaff(staff)
      if (foundUser.Error) throw foundUser.Error
      else if (foundUser.length === 0) throw "4004"

      // compare hashes
      const doesMatch = await bcrypt.compare(staff.password, foundUser[0].password)
      if (!doesMatch) throw "4001"
      // generate authentication token and add to db
      const jwt = await generateAuthToken(foundUser[0].id)
      // return the auth token
      const resData = await StaffModel.addNewAuthToken({staffId: foundUser[0].id, token: jwt, id: uuidv4()})
      if (resData.Error) throw resData.Error
      else if (resData.Success) return {token: jwt}
      else throw "Unexpected error during login"
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  deleteLogoutStaff: async (body: {token: string, id: string}) => {
    try {
      console.log(body)
      const valid = validateStaffLogoutParams(body)
      if (!valid) throw "4022"
      const resData = await StaffModel.deleteAuthToken(body.id, body.token)
      if (resData?.Error) throw resData.Error
      
      return resData
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  deleteAccountStaff: async (body: {id: string, staff: {id: string}}) => {
    try {
      if (!body.staff) throw "4000"
      const {staff, id} = body

      const valid = validateDeleteStaffParams(staff)
      if (!valid) throw "4022"
      
      // An admin can only delete a staff with no admin privileges
      // Only admin an admin can delete is itself
      const foundStaff = await knex('staff').select('isAdmin', 'id').where({id: staff.id})
      if (foundStaff.length === 0 || foundStaff === 0) throw "4003"
      if (foundStaff[0].isAdmin) {
        if (id !== foundStaff.id) throw "4003"
      }

      const resData = await StaffModel.deleteAccountStaff(staff)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  updateAccountStaff: async (body: {staff: StaffUpdateType}) => {
    try {
      if (!body.staff) throw "4000"
      const {updates} = body.staff

      const valid = validateStaffUpdateParams(body.staff)
      if (!valid) throw "4022"

      if (updates.password) updates.password = await bcrypt.hash(updates.password, 10)

      const resData = await StaffModel.updateStaff(body.staff)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  }

}

export {
  StaffController
}