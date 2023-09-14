import { knexConfig } from "./knexfile"

const knex = require('knex')(knexConfig)

export {knex} 