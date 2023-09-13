import { knexTestConfig } from "../../__test__/client/__mocks__/knexfileTest"
import { knexConfig } from "./knexfile"

const config = ((env: any) => {
  if (env === 'test') {
    return knexTestConfig
  }
  return knexConfig
})(process.env.NODE_ENV)

const knex = require('knex')(config)

export {knex} 