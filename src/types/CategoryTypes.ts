
interface CreateCategoryType {
  id: string,
  name: string,
  parentName: string
}

interface UpdateCategoryType {
  nameToUpdate: string,
  updates: {
    name: string,
    parentName: string
  }
}

export {
  CreateCategoryType,
  UpdateCategoryType,
}