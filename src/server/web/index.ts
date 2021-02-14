import { Router } from "express"
import api from "./api"
import subdomains from "./domains"
import routes from "./routes"

const route = Router()

route.use(subdomains, api, routes)

export default route
