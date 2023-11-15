
interface CreateCategoryType {
  id: string,
  name: string,
  parent_id: string
}

interface UpdateCategoryType {
  id: string,
  updates: {
    name: string,
    parent_id: string
  }
}

export {
  CreateCategoryType,
  UpdateCategoryType,
}