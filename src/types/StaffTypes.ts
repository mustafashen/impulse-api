
interface StaffType  {
  id: string,
  email: string,
  password: string,
  name: string,
  tokens: string[] | []
  isAdmin: false
}

export { 
  StaffType
}