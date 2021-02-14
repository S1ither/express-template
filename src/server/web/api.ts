import { Router } from "express"
import { ExampleController } from "../app/controllers/api"
const route = Router()

//#region Route's
route.get("/users", ExampleController.checkSubDomain.bind(ExampleController))

//#endregion

export default route
