import { Request, Response } from "express"
import { ExampleProvider } from "../../providers"
import BaseController from "../BaseController"

class Example extends BaseController {
  get(req: Request, res: Response) {
    const users = new ExampleProvider().find()
    res.json(users)
  }
}

const _ = new Example("api")
export default _
