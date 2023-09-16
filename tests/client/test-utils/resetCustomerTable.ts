import { knex } from "../../../src/db/knex"

async function resetCustomerTable() {
  await knex('customer').delete()
  await knex.destroy()

  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })  
}

export {
  resetCustomerTable
}