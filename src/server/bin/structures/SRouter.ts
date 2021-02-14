import { NextFunction, Request, Response, Router } from "express"

function SRouter() {
  return SRouter
}

SRouter.prototype.checkSubDomain = function (subdomains: string | string[], req: Request, res: Response, next: NextFunction) {
  if (req.subdomains && req.subdomains.length > 0)
    for (const subdomain of subdomains) {
      if (subdomain == req.subdomains[0]) return SRouter
    }
  next()
}

export default SRouter
