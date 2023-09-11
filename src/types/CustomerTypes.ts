export interface CustomerType {
  id: string,
  name: string,
  last_name: string,
  birth_date: string,
  email: string,
  password: string,
  phone: string,
  gender: string,
  address: string,
  state?: string,
  city: string,
  province: string,
  country: string,
  zip_code: string,
  tokens?: string[],
}

export type PostgresError = {
    length: number,
    name: string,
    severity: string,
    code: string,
    detail: string,
    schema: string,
    table: string,
    constraint: string,
    file: string,
    line: string,
    routine: string
}