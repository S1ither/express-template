import dotenv from "dotenv"
import { join } from "path"

export const rootDir = join(__dirname, "..", "..")
export const serverDir = join(__dirname)
export const clientDir = join(__dirname, "..", "client")
export const storageLink = join(clientDir, "resources", "storage")

dotenv.config({ path: join(rootDir, ".env") })
export const { PORT, HOST, DATABASE_SEEDER, DATABASE_TYPE, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, PROD, DATABASE_HOST } = process.env

export const isSubdaominEnabled = true