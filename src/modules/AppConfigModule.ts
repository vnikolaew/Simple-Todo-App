import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as RedisStore from "connect-redis";
import * as session from "express-session";
import { RedisClient } from "redis";
import { REDIS, RedisCacheModule } from "./RedisCacheModule";

export const HTTP_SESSION_CONFIG = Symbol.for("HttpSessionConfig");

@Module({
   imports: [RedisCacheModule, ConfigModule],
   providers: [
      ConfigService,
      {
         provide: HTTP_SESSION_CONFIG,
         useFactory: (
            redisClient: RedisClient,
            configService: ConfigService
         ) => ({
            secret: configService.get("SESSION_SECRET") || "a secret",
            cookie: {
               httpOnly: true,
               maxAge: 60 * 60 * 1000,
               sameSite: true,
               secure: configService.get("NODE_ENV") === "production",
            },
            name: configService.get("SESSION_NAME") || "sid",
            resave: false,
            saveUninitialized: true,
            store: new (RedisStore(session))({
               client: redisClient,
               logErrors: true,
            }),
         }),
         inject: [REDIS, ConfigService],
      },
   ],
   exports: [HTTP_SESSION_CONFIG],
})
export class AppConfigModule {}
