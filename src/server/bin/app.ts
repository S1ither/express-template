import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import express, { Express, Router } from "express"
import { existsSync, writeFileSync } from "fs"
import { join } from "path"
import { createConnection } from "typeorm"
import {
  clientDir,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_SEEDER,
  DATABASE_TYPE,
  DATABASE_USER,
  PROD,
  serverDir,
} from "../config"
import Log from "./structures/Log"
import cors from "cors"
import multer from "multer"
import DatabaseModels from "../database/model/Main"
import mysqldump from "mysqldump"
import moment from "moment"
import Seeder from "../database/seed/Seeder"
const upload = multer()
const es6_express = require("express-es6-template-engine")

export default class {
  private app: Express = express()

  private readonly port: number
  private readonly host: string

  constructor(port: number = 80, host: string = "127.0.0.1") {
    this.port = port
    this.host = host

    this.init()
  }

  //#region Загрузка маршрутов
  private routes() {
    Log.warn("Routes start loading...")
    const routeExpansion = !!!PROD ? ".js" : ".ts"
    if (existsSync(join(serverDir, `web`))) {
      try {
        const routes = require(join(serverDir, "web", "index" + routeExpansion)).default
        ;(routes as Router) && this.app.use(routes)
        Log.info("Routes success loaded")
      } catch (err) {
        Log.error("Routes not loaded")
      }
    } else Log.warn("Routes folder not found")
  }
  //#endregion

  private async db() {
    if (DATABASE_TYPE && DATABASE_TYPE == "mysql" && DATABASE_NAME && DATABASE_USER && DATABASE_PASSWORD) {
      Log.warn("Databse init connect...")
      try {
        await createConnection({
          type: DATABASE_TYPE,
          database: DATABASE_NAME,
          username: DATABASE_USER,
          password: DATABASE_PASSWORD,
          synchronize: true,
          cli: {
            entitiesDir: join(serverDir, "database", "entity"),
          },
          entities: [join(serverDir, "database", "entity", "**", "*")],
        })
        Log.info("Database connected")
        if (!!DATABASE_SEEDER) {
          Log.info("Initializing database seeding")
          Log.warn("Seeding...")
          await Seeder().catch((err) => {
            Log.error(err)
            console.log(err)
          })
          Log.info("Seeding succeeded")
        }
        Log.info("Database models initialized")
        Log.warn("Loading...")
        await DatabaseModels().catch((err) => {
          Log.error(err)
          console.log(err)})
          Log.info("Database models initialized successfully")
      } catch (err) {
        Log.error("Database not connected")
        Log.error(err)
      }
      setInterval(async () => {
        const filename = moment().locale("ru").format("L") + ".sql"
        const pathToFile = join(serverDir, "database", "backup", filename)
        writeFileSync(pathToFile, "")
        await mysqldump({
          connection: {
            database: DATABASE_NAME!,
            user: DATABASE_USER!,
            password: DATABASE_PASSWORD!,
            port: 3306,
            charset: "utf8",
            host: DATABASE_HOST,
          },
          dumpToFile: pathToFile,
        }).catch((err) => console.log(err))
      }, 60000)
    } else Log.warn("The database is not found in the config")
  }

  private template() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(upload.none())
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
    this.app.use(cors())
    this.app.use("**/public", express.static(join(clientDir, "public")))
    this.app.engine("html", es6_express)
    this.app.set("view engine", "html")
    this.app.set("views", join(clientDir, "resources", "views"))
  }

  private async init() {
    Log.info("Server atach launch")
    await this.template()
    await this.db()
    await this.routes()

    await this.app.listen(this.port, this.host)
    Log.info(`Server start on protocol HTTP, address http://${this.host}:${this.port}`)
  }
}
