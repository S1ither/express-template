import { Router } from "express"
import { HomeController } from "../app/controllers/routes"
const route = Router()

//#region Routes map start, add some routes

//#region Home
route.get("/", HomeController.checkSubDomain.bind(HomeController))

//#endregion

//#endregion Routes map ends

export default route
