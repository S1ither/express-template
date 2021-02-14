import { Example } from "../../entity"
import { BaseSeed } from "../Seeder"

type TExample = {
  id: number | undefined
  name: string
}

export default class extends BaseSeed {
  static readonly dataSeeds: TExample[] = [
    {
      id: undefined,
      name: "Director",
    },
    {
      id: undefined,
      name: "Date grant",
    },
  ]
  static NewRow() {
    return new Example()
  }
  static async DataInsertDB(): Promise<void> {
    for (let i = 0; i < this.dataSeeds.length; i++) {
      const { id, name } = this.dataSeeds[i]
      let _ = this.NewRow()
      _.id = id as number
      _.name = name
      await _.save().catch((e) => {
        console.log(e)
      })
    }
  }
}
