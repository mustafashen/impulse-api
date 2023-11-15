const product_create = {
  product: {
    id: "aa9b119d-3cd0-4980-96dc-4c5bf0ece443",
    name: "mockProductName",
    price: 12,
    stock: 12,
    description: "mockDescription",
    features: {"mockFeature": "feature"},
    category_id: "aa9b119d-3cd0-4980-96dc-4c5bf0ece444",
  }
}

const product_delete = {
  product: {
    id: "aa9b119d-3cd0-4980-96dc-4c5bf0ece443",
  }
}

const product_update = {
  product: {
    id: "aa9b119d-3cd0-4980-96dc-4c5bf0ece443",
    updates: {
      name: "newMockProductName"
    }
  }
}

export {
  product_create,
  product_update,
  product_delete,
}