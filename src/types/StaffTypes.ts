
interface StaffType  {
  id: string,
  email: string,
  password: string,
  name: string,
  tokens: string[] | []
  isAdmin: false
}

interface StaffLoginType  {
  email: string,
  password: string
}

export { 
  StaffType,
  StaffLoginType
}