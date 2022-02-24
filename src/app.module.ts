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
import {
   AppConfigModule,
   HTTP_SESSION_CONFIG,
} from "./modules/AppConfigModule";
import { RedisCacheModule } from "./modules/RedisCacheModule";

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: "./.dev.env" }),
      DatabaseModule,
      RedisCacheModule,
      ViewsModule,
      IdentityModule,
      TodoItemModule,
      AppConfigModule,
   ],
})
export class AppModule implements NestModule {
   constructor(
      @Inject(HTTP_SESSION_CONFIG) private sessionConfig: session.SessionOptions
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
