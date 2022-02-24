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

interface UserLoginRequestModel {
   email: string;
   password: string;
}

interface UserRegisterRequestModel {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
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
      @Body() userLoginInput: UserLoginRequestModel,
      @Res({ passthrough: true }) res: Response
   ) {
      const { email, password } = userLoginInput;
      if (!email || !password)
         return res
            .status(HttpStatus.BAD_REQUEST)
            .send("Missing login fields.");

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
   async logout(@Session() session: Request["session"], @Res() res: Response) {
      if (session) {
         session?.destroy(() => {});
      }
   }

   @Post("/register")
   @Redirect("/main")
   async register(
      @Req() session: Request["session"],
      @Body()
      userRegisterInput: UserRegisterRequestModel,
      @Res()
      res: Response
   ) {
      // const { firstName, lastName, email, password } = req.body;
      // if (!email || !password || !firstName || !lastName)
      //    return res.status(404).send("Missing login fields.");

      const user = await this._identityService.register(userRegisterInput);

      // @ts-ignore
      session.user = res.locals.user = user;
   }

   @Render("register")
   @Header("Content-Type", "text/html")
   @Get("/register")
   async registerPage() {
      console.log("Rendering Register page ...");
   }

   @Put("/change-password")
   @HttpCode(HttpStatus.NO_CONTENT)
   async changePassword(
      @Body()
      userChangePasswordInput: Omit<UserChangePasswordInputModel, "userId">,
      @Session() session: Request["session"]
   ) {
      // @ts-ignore
      const { userId } = session.user;

      return await this._identityService.changePassword({
         userId,
         ...userChangePasswordInput,
      });
   }
}
