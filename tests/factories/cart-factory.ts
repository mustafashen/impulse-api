
const cart_line_list = {
  cart: {
    cart_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc"
  }
}

const cart_create = {
  cart: {
    location: "TR"
  }
}

const cart_update = {
  cart: {
    id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
    updates: {
      location: "US",
      address_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111ca",
      order_placed: false
    }
  }
}

const cart_line_create = {
  cart_line: {
    cart_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
    product_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
  }
}

const cart_line_delete = {
  cart_line: {
    cart_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
    id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
  }
}

const cart_line_update = {
  cart_line: {
    cart_id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
    id: "6de31bc8-9a89-4c82-b58b-0a6e4e9111cc",
    updates: {
      quantity: 1
    }
  }
}

export {
  cart_line_list,
  cart_create,
  cart_update,
  cart_line_create,
  cart_line_delete,
  cart_line_update
}