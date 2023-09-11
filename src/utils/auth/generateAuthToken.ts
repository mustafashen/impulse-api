var jwt = require('jsonwebtoken')

async function generateAuthToken(id: string) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })
  
  return token
}

export {
  generateAuthToken
}