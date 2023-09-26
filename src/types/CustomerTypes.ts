interface CustomerType {
  id: string,
  name: string,
  last_name: string,
  birth_date: string,
  email: string,
  password: string,
  phone: string,
  gender: string,
  is_active: boolean,
}

interface CustomerUpdateType {
  password: string
  updates: {
    name: string,
    last_name: string,
    birth_date: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    is_active: boolean,
  }
}

export {
  CustomerType,
  CustomerUpdateType
}