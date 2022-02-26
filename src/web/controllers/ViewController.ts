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
import { User } from "@web/common/decorators/UserDecorator";
import { Request, Response } from "express";
import { SessionUser } from "./IdentityController";

@Controller("/")
export class ViewController {
   @Get("/")
   @Render("start")
   @Header("Content-Type", "text/html")
   async home() {}

   @Get("/main")
   @Render("main")
   @Header("Content-Type", "text/html")
   @HttpCode(HttpStatus.OK)
   async main(@User() user: SessionUser, @Res() res: Response) {
      res.locals.user = user;
   }

   @Render("login")
   @Header("Content-Type", "text/html")
   @Get("/login")
   async loginPage() {}

   @Render("register")
   @Header("Content-Type", "text/html")
   @Get("/register")
   async registerPage() {}

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
