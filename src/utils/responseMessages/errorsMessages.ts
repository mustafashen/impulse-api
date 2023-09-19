
// TODO: Organize error messages better
const errorMessages = (code: string) => {
  switch (code) {
    // Postgres Errors
    case "23505":
      return { httpCode: 409, message: {DB: "Unique violation"} }
    case "23503":
      return { httpCode: 409, message: {DB: "Foreign key violation"} }
    case "23514":
      return { httpCode: 422, message: {DB: "Check violation"} }
    case "08001":
      return { httpCode: 503, message: {DB: "Unable to connect to db"} }
    case "42601":
      return { httpCode: 400, message: {DB: "Syntax error"} }
    case "57014":
      return { httpCode: 504, message: {DB: "Statement timeout"} }
    case "42501":
      return { httpCode: 403, message: {DB: "Insufficient permission"} }
    // Authentication Errors
    case "1000":
      return { httpCode: 401, message: {Server: "Authentication error"} }
    // Validation Errors
    case "2000":
      return { httpCode: 422, message: {Server: "Input validation error"} }
    // Resource not found Errors
    case "3000":
      return { httpCode: 404, message: {Server: "Resource not found"} }
    // Authorization Error
    case "4000":
      return { httpCode: 403, message: {Server: "Not authorized"} }
    // Internal Server Error
    case "5000":
      return { httpCode: 500, message: {Server: "Internal server error"} }
    case "6000":
      return { httpCode: 400, message: {Server: "Bad request"}}
    default:
      return { httpCode: 500, message: {Server: "Internal server error"} }
    
  }
}

export {
  errorMessages
}