import ExampleModel from "../../database/model/ExampleModel"

type TExample = {
  id: number | undefined
  name: string
}

export default class {
  readonly users: TExample[] = []
  constructor() {
    this.users = ExampleModel.GetExamples()
  }

  find() {
    return this.users
  }

  findOne(userToFind: TExample): TExample | undefined {
    return this.users.find((v) => v.name && v.name == userToFind.name)
  }

  delete(userToFind: TExample) {
    this.users.filter((_) => _ != userToFind)
    return this.users
  }

  add(userNo: TExample[]) {
    this.users.push(...userNo)
  }
}
