import { readdirSync } from "fs"
import { join } from "path"

export default async () => {
  const files = readdirSync(__dirname, { encoding: "utf8" }).filter((_) => !_.startsWith("index"))
  for (const file of files) {
    const model = require(join(__dirname, file)).default
    await model.init()
  }
}
