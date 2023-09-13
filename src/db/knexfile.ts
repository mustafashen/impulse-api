const knexConfig = {
  client: 'pg',
  connection: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require", 
  }
}

export {
  knexConfig
}