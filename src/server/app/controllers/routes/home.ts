import { Request, Response } from "express"
import { join } from "path"
import { clientDir } from "../../../config"
import BaseController from "../BaseController"

class Home extends BaseController {
  get(req: Request, res: Response) {
    res.render("welcome", {
      locals: { title: "First page", message: "The second part" },
      partials: { template: join(clientDir, "resources", "views", "home.html") },
    })
  }
}

const _ = new Home("home")
export default _
