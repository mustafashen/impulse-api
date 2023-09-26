
interface AddressType {
  id: string,
  title: string,
  state?: string,
  city: string,
  district: string,
  country: string,
  zip_code: string,
  address: string,
  phone: string,
  customer_id: string
}

export {
  AddressType
}