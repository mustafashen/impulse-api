
const mockInputsCustomer = {
  
  signupInput: {
    "body" : {
      "customer": {
        "name": "Somename",
        "last_name": "Somelastname",
        "birth_date": "1990-12-12",
        "email": "some@email.com",
        "password": "abc123dfe",
        "phone": "+123456789123",
        "gender": "Any",
        "address": "Somewhere there",
        "city": "Some city",
        "province": "Some province",
        "country": "Some country",
        "zip_code": "12345"
      }
    }
  },

  loginInput: {
    "body" : {
      "customer": {
        "email": "some@email.com",
        "password": "abc123def"
      }
    }
  }
}

export {
  mockInputsCustomer
}