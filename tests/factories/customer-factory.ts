
const customer_signup =  {
  "customer": {
    "name": "Name",
    "last_name": "LastName",
    "email": "mail@mail.com",
    "password": "32sdlkfj32",
  }
}

const customer_login =  {
  "customer": {
  "email": "mail@mail.com",
  "password": "32sdlkfj32"
  }
}

const customer_logout =  {
  "id": "mockCustomerId",
  "token": "mockAccessToken"
}

const customer_delete =  {
  "id": "mockCustomerId",
  "token": "mockAccessToken",
  "password": "32sdlkfj32"
}

const customer_update =  {
  "id": "mockCustomerId",
  "customer": {
    "password": "32sdlkfj32",
    "updates": {}
  }
}

export {
  customer_signup,
  customer_login,
  customer_logout,
  customer_delete,
  customer_update
}