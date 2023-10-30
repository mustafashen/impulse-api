
interface CreateShipmentType {
  id: string,
  address_id: string
}

interface UpdateShipmentType {
  id: string,
  updates: {
    carrier_name: string,
    tracking_number: string,
  }
}