
interface StaffType  {
  id: string,
  email: string,
  password: string,
  name: string,
  isAdmin: false
}

interface StaffLoginType  {
  email: string,
  password: string
}

interface StaffUpdateType {
  id: string,
  updates: {
    email: string,
    password: string,
    name: string,
    isAdmin: false  
  }
}

export { 
  StaffType,
  StaffLoginType,
  StaffUpdateType
}