
const staff_create = {
  staff: {
    email: 'mock@mail.com',
    password: 'mockPassword',
    name: 'Mock Name',
    isAdmin: false
  }
}

const staff_login = {
  staff: {
    email: 'mock@mail.com',
    password: 'mockPassword',
  }
}

const staff_update = {
  staff: {
    id: "aa9b119d-3cd0-4980-96dc-4c5bf0ece443",
    updates: {
      email: 'mock@mail.com',
      password: 'mockPassword',
      name: 'Mock Name',
      isAdmin: false
    }
  }
}

export {
  staff_create,
  staff_login,
  staff_update
}