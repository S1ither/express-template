import { gray, green, red, yellow } from "chalk"
import { appendFileSync, existsSync, mkdirSync } from "fs"
import moment from "moment"
import { join } from "path"
import { rootDir } from "../../config"

type LogType = "error" | "warn" | "info"

const LOG_DIR = join(rootDir, "logs")
const LOG_FILE = join(LOG_DIR, `${moment().locale("ru").format("L")}.log`)

export default class Log {
  static send(content: string, type: LogType = "info") {
    const now = moment().locale("ru").format("LTS L")
    switch (type) {
      case "error":
        console.log(`[${gray(now)}] ${red("[ERROR]")} ${content}`)
        content = `[${now}] ${"[ERROR]"} ${content}`
        break

      case "warn":
        console.log(`[${gray(now)}] ${yellow("[WARN]")} ${content}`)
        content = `[${now}] ${"[WARN]"} ${content}`
        break

      case "info":
        console.log(`[${gray(now)}] ${green("[INFO]")} ${content}`)
        content = `[${now}] ${"[INFO]"} ${content}`
        break
    }
    if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR)
    appendFileSync(LOG_FILE, content + "\n")
  }

  static error(content: string) {
    this.send(content, "error")
  }

  static warn(content: string) {
    this.send(content, "warn")
  }

  static info(content: string) {
    this.send(content, "info")
  }
}
