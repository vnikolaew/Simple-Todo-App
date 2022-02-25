import { Request, Response } from "express";
import { IIdentityService } from "@application/identity/services/IdentityService";
import { UserChangePasswordInputModel } from "@application/identity/models/UserChangePasswordInputModel";
import {
   Body,
   Controller,
   Get,
   Header,
   HttpCode,
   HttpStatus,
   Inject,
   Post,
   Put,
   Redirect,
   Render,
   Req,
   Res,
   Session,
} from "@nestjs/common";
import { UserLoginValidationPipe } from "@web/common/pipes/UserLoginValidationPipe";
import { UserSignUpValidationPipe } from "@web/common/pipes/UserSignUpValidationPipe";
import { User } from "@web/common/decorators/UserDecorator";

export interface UserLoginRequestModel {
   email: string;
   password: string;
}

export interface UserRegisterRequestModel {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

export interface SessionUser {
   userId: number;
   email: string;
   firstName: string;
   lastName: string;
}

@Controller("")
export class IdentityController {
   constructor(
      @Inject(IIdentityService)
      private readonly _identityService: IIdentityService
   ) {}

   @Post("/login")
   @HttpCode(HttpStatus.OK)
   @Redirect("/main")
   async login(
      @Session() session: Request["session"],
      @Body(new UserLoginValidationPipe())
      userLoginInput: UserLoginRequestModel,
      @Res({ passthrough: true }) res: Response
   ) {
      const { email, password } = userLoginInput;
      const user = await this._identityService.login({ email, password });

      // @ts-ignore
      session.user = res.locals.user = user;
      return user;
   }

   @Render("login")
   @Header("Content-Type", "text/html")
   @Get("/login")
   async loginPage(@Res({ passthrough: true }) res: Response) {}

   @Get("/logout")
   @HttpCode(HttpStatus.OK)
   @Redirect("/")
   async logout(@Session() session: Request["session"]) {
      if (session) {
         session?.destroy(() => {});
      }
   }

   @Post("/register")
   @Redirect("/main")
   async register(
      @Session() session: Request["session"],
      @Body(new UserSignUpValidationPipe())
      userRegisterInput: UserRegisterRequestModel,
      @Res()
      res: Response
   ) {
      const user = await this._identityService.register(userRegisterInput);

      // @ts-ignore
      session.user = res.locals.user = user;
   }

   @Render("register")
   @Header("Content-Type", "text/html")
   @Get("/register")
   async registerPage() {}

   @Put("/change-password")
   @HttpCode(HttpStatus.NO_CONTENT)
   async changePassword(
      @Body()
      userChangePasswordInput: Omit<UserChangePasswordInputModel, "userId">,
      @User() user: SessionUser
   ) {
      const { userId } = user;
      return await this._identityService.changePassword({
         userId,
         ...userChangePasswordInput,
      });
   }
}
