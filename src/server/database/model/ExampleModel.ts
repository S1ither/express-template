import { Example } from "../entity"

type TExampleModel = {
  id: number
  name: string
}

let ExampleModelArr: TExampleModel[] = []

export default class {
  public static async init() {
    ExampleModelArr = []
    const examples = await Example.find()
    try {
      for (const { id, name } of examples) {
        ExampleModelArr.push({
          id,
          name,
        })
      }
    } catch (error) {}
    setTimeout(async () => {
      await this.update()
    }, 60000)
    // Hours - 3 600 000
    // 30 Minuts - 1 800 000
  }

  public static async update() {
    const examplesOfDB = await Example.find()
    for (const exampleOfModel of ExampleModelArr) {
      let example = examplesOfDB.find((_) => _.id == exampleOfModel.id)
      if (example) {
        example.name = exampleOfModel.name
        await example.save()
      } else {
        const example = new Example()
        example.name = exampleOfModel.name
        await example.save()
      }
    }
    await this.init()
  }

  public static GetExamples() {
    return [...ExampleModelArr]
  }
}
