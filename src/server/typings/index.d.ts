import { NextFunction, Request, Response } from "express"

declare class Controller implements IController {
  domain: string | undefined
  checkSubDomain: (req: Request, res: Response, next: NextFunction) => any | NextFunction
  get: (req: Request, res: Response, next?: NextFunction) => void
  post: (req: Request, res: Response, next?: NextFunction) => void
  put: (req: Request, res: Response, next?: NextFunction) => void
  delete: (req: Request, res: Response, next?: NextFunction) => void
}

interface IController {
  domain: string | undefined
  checkSubDomain: (req: Request, res: Response, next: NextFunction) => any | NextFunction
  get: (req: Request, res: Response, next?: NextFunction) => void
  post: (req: Request, res: Response, next?: NextFunction) => void
  put: (req: Request, res: Response, next?: NextFunction) => void
  delete: (req: Request, res: Response, next?: NextFunction) => void
}
