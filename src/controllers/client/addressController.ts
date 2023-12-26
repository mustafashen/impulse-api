import { AddressModel } from "../../models/client/addressModel";
import { AddressType, AddressUpdateType } from "../../types/AddressTypes";
import { validateAddressCreateParams, validateAddressUpdateParams } from "../../utils/validation/client/addressValidation";
const { v4: uuidv4 } = require('uuid')

const AddressController = {
    postCreateAddress: async (body: {id: string, address: AddressType}) => {
      try {
        
        if (!body.address) throw "4000"
        const {address} = body
        
        address.customer_id = body.id
        address.id = uuidv4()
        const valid = validateAddressCreateParams(address)
        if (!valid) throw "4022"
        
        const resData = await AddressModel.createAddress(address)
        if (resData?.Error) throw resData.Error
        return resData

      } catch (error: any) {
        console.log('create address controller', error)
        return {Error: error}
      }
    },
    listAddress: async (body: {id: string}) => {
      try {
        if (!body.id) throw "4000"
        
        const resData = await AddressModel.readAddress(body.id)
        if (resData?.Error) throw resData.Error
        return resData

      } catch (error: any) {
        console.log('read address controller', error)
        return {Error: error}
      }
    },
    deleteAddress: async (body: {id: string, address: { address_id: string }}) => {
      try {
        if (!body.id || !body.address.address_id) throw "4000"
        
        const resData = await AddressModel.deleteAddress({customer_id: body.id, id: body.address.address_id})
        if (resData?.Error) throw resData.Error
        return resData

      } catch (error: any) {
        console.log('delete address controller', error)
        return {Error: error}
      }
    },

    updateAddress: async (body: {id: string, address: AddressUpdateType}) => {
      try {
        
        if (!body.address.updates) throw "4000"
        const {address} = body
        
        const valid = validateAddressUpdateParams(address)
        if (!valid) throw "4022"
        
        const resData = await AddressModel.updateAddress({id: address.id, updates: address.updates})
        if (resData?.Error) throw resData.Error
        return resData

      } catch (error: any) {
        console.log('create address controller', error)
        return {Error: error}
      }
    },
}

export {
  AddressController
}