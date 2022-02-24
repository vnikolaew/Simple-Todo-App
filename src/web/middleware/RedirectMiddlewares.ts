import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class RedirectToStartPageMiddleware implements NestMiddleware {
   use(req: Request, res: Response, next: NextFunction) {
      // @ts-ignore
      if (req.session.hasOwnProperty("user")) {
         return res.redirect("/main");
      } else next();
   }
}

export class RedirectToLoginPageMiddleware implements NestMiddleware {
   use(req: Request & { session: any }, res: Response, next: NextFunction) {
      if (!req.session || !req.session?.hasOwnProperty("user")) {
         return res.redirect("/login");
      } else {
         res.locals.user = req.session.user;
         return next();
      }
   }
}
