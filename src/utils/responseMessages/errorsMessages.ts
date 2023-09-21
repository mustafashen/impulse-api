
// TODO: Organize error messages better
const errorMessages = (code: string) => {
  switch (code) {
    
    // Postgres Errors
    case "08001":
      return { httpCode: 503, message: {DB: "Unable to connect to db"} }
    case "23502":
      return { httpCode: 400, message: {DB: "Primary key violation"}}
    case "23503":
      return { httpCode: 409, message: {DB: "Foreign key violation"} }
    case "23505":
      return { httpCode: 409, message: {DB: "Unique violation"} }
    case "23514":
      return { httpCode: 422, message: {DB: "Check violation"} }
    case "42501":
      return { httpCode: 403, message: {DB: "Insufficient permission"} }
    case "42601":
      return { httpCode: 400, message: {DB: "Syntax error"} }
    case "57014":
      return { httpCode: 504, message: {DB: "Statement timeout"} }

    // Server errors
    case "4003":
      return { httpCode: 400, message: {Server: "Bad request"}}
    case "4001":
      return { httpCode: 401, message: {Server: "Authentication error"} }
    case "4003":
      return { httpCode: 403, message: {Server: "Not authorized"} }
    case "4004":
      return { httpCode: 404, message: {Server: "Resource not found"} }
    case "4022":
      return { httpCode: 422, message: {Server: "Input validation error"} }
    case "5000":
      return { httpCode: 500, message: {Server: "Internal server error"} }
    default:
      return { httpCode: 500, message: {Server: "Internal server error"} }
    
  }
}



export {
  errorMessages
}