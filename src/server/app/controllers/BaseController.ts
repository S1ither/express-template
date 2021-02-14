import { NextFunction, Request, Response } from "express"
import {Controller} from "../../typings"

export default class implements Controller {
  readonly domain: string | undefined
  constructor(domain: string | undefined){
    this.domain = domain
  }
  public checkSubDomain(req: Request, res: Response, next: NextFunction): any | NextFunction {
    const { subdomains, method } = req
    if ((this.domain == undefined && subdomains.length == 0) || subdomains[0] == this.domain) {
      switch (method) {
        case "GET":
          return this.get(req, res)
        case "POST":
          return this.post(req, res)
        case "PUT":
          return this.put(req, res)
        case "DELETE":
          return this.delete(req, res)
        default:
          res.status(404).json({ error: "404", message: "Not Found" })
          break
      }
    }
    next()
  }
  get (req: Request, res: Response): void {
    res.status(404).json({ error: "404", message: "Not Found" })
  }
  post (req: Request, res: Response): void {
    res.status(404).json({ error: "404", message: "Not Found" })
  }
  put (req: Request, res: Response): void {
    res.status(404).json({ error: "404", message: "Not Found" })
  }
  delete (req: Request, res: Response): void {
    res.status(404).json({ error: "404", message: "Not Found" })
  }
}
