import { readdirSync } from "fs"
import { join } from "path"

/**
 * @class BaseSeed стандартный класс для сидов
 * @param dataSeeds массив который заполняется объектами для вставки в бд
 * @function NewRow() возвращает сущность нужной таблицы(заполняется самостоятельно)
 * @function DataInsertDB() заполняет таблицу оперируя значениями из 'dataSeeds'(заполняется самостоятельно)
 * @function init() инициирует класс, изменять нельзя
 */
export class BaseSeed {
  static readonly dataSeeds: string[] | any[] = []
  static NewRow(): object | any {}
  static async DataInsertDB(): Promise<void> {}
  protected static async init(): Promise<void> {
    for (let i = 0; i < this.dataSeeds.length; i++) {
      const element = this.dataSeeds[i]
      element.id = i + 1
    }
    await this.DataInsertDB()
  }
}
/**
 * Init Seeder
 */
export default async function () {
  try {
    const seedsDirArr = readdirSync(join(__dirname, "seeds"), { encoding: "utf8" })
    for (const item of seedsDirArr) {
      if (item.split("\\").reverse()[0].includes(".")) {
        const seeder = require(join(__dirname, "seeds", item)).default
        await seeder.init()
        delete require.cache[join(__dirname, "seeds", item)]
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}
