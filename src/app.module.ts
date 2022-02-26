import { Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "./modules/DatabaseModule";
import { IdentityModule } from "./modules/IdentityModule";
import { TodoItemModule } from "./modules/TodoItemModule";
import { ConfigModule } from "@nestjs/config";
import * as session from "express-session";
import { ViewsModule } from "./modules/ViewsModule";
import {
   JSONParserHandler,
   LoggingMiddleware,
   URLEncodedParserHandler,
} from "@web/middleware";
import { AppConfigModule, SESSION_CONFIG } from "./modules/AppConfigModule";

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: "./.dev.env" }),
      DatabaseModule,
      ViewsModule,
      IdentityModule,
      TodoItemModule,
      AppConfigModule,
   ],
})
export class AppModule implements NestModule {
   constructor(
      @Inject(SESSION_CONFIG) private sessionConfig: session.SessionOptions
   ) {}
   configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(
            session(this.sessionConfig),
            new JSONParserHandler().use(),
            new URLEncodedParserHandler().use(),
            new LoggingMiddleware().use
         )
         .forRoutes("*");
   }
}
