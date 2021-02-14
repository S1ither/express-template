import { Request, Response, NextFunction, Router } from "express"
import { isSubdaominEnabled } from "../config"
const route = Router()

route.all("*", (req: Request, res: Response, next: NextFunction) => {
  switch (req.subdomains[0]) {
    case "home":
      next()
      break
    case "api":
      next()
      break
    default:
      isSubdaominEnabled && res.redirect("http://home.express.localhost")
      !isSubdaominEnabled && next()
      break
  }
})

export default route
