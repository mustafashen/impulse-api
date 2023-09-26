import { AddressModel } from "../../models/client/addressModel";
import { AddressType } from "../../types/AddressTypes";
import { validateAddressCreateParams } from "../../utils/validation/client/addressValidation";
const { v4: uuidv4 } = require('uuid')

const AddressController = {
    postCreateAddress: async (body: {id: string, address: AddressType}) => {
      try {
        
        if (!body.address) throw "4000"
        const {address} = body
        
        address.customer_id = body.id
        address.id = uuidv4()
        
        const valid = validateAddressCreateParams(address)
        if (!valid) throw "4000"
        
        const resData = await AddressModel.createAddress(address)
        if (resData?.Error) throw resData.Error
        return resData

      } catch (error: any) {
        console.log('create address controller', error)
        return {Error: error}
      }
    }
}

export {
  AddressController
}