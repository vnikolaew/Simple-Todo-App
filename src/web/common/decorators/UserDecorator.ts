import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const User = createParamDecorator(
   (_: unknown, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest<Request>();
      if (req.session.hasOwnProperty("user")) {
         return req.session["user"];
      }
   }
);
