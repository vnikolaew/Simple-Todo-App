import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Redis from "redis";

export const REDIS = Symbol.for("REDIS_CONFIG");

@Module({
   imports: [ConfigModule],
   providers: [
      ConfigService,
      {
         provide: REDIS,
         useFactory: async (configService: ConfigService) => {
            return Redis.createClient({
               port: Number(configService.get("REDIS_PORT")),
               host: configService.get("REDIS_HOST"),
               retry_max_delay: 500,
               max_attempts: 5,
            });
         },
         inject: [ConfigService],
      },
   ],
   exports: [REDIS],
})
export class RedisCacheModule {}
