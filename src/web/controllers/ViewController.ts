import {
   Controller,
   Get,
   Header,
   HttpCode,
   HttpStatus,
   Render,
   Res,
   Session,
} from "@nestjs/common";
import { Request, Response } from "express";

@Controller("")
export class ViewController {
   @Get("/")
   @Render("start")
   @Header("Content-Type", "text/html")
   async home() {}

   @Get("/main")
   @Render("main")
   @Header("Content-Type", "text/html")
   @HttpCode(HttpStatus.OK)
   async main(@Session() session: Record<string, any>, @Res() res: Response) {
      res.locals.user = session.user;
   }

   @Get("/session-check")
   async checkUserSession(@Session() session: Request["session"]) {
      return { session };
   }

   @Get("/health-check")
   @HttpCode(HttpStatus.OK)
   async healthCheck() {
      return "Server is up and running!";
   }
}
