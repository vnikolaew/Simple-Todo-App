import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggingMiddleware implements NestMiddleware {
   use(req: Request, _res: Response, next: NextFunction) {
      console.log(
         `[${req.method}] ${req.baseUrl} ${new Date().toLocaleTimeString()}`
      );
      next();
   }
}
