import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Redis from "redis";

export const REDIS_CLIENT = Symbol.for("REDIS_CONFIG");

@Module({
   imports: [ConfigModule],
   providers: [
      ConfigService,
      {
         provide: REDIS_CLIENT,
         useFactory: async (configService: ConfigService) => {
            return Redis.createClient({
               port: Number(configService.get("REDIS_PORT")),
               host: configService.get("REDIS_HOST"),
               retry_max_delay: Number(
                  configService.get("REDIS_RETRY_MAX_DELAY")
               ),
               max_attempts: Number(configService.get("REDIS_MAX_ATTEMPTS")),
            });
         },
         inject: [ConfigService],
      },
   ],
   exports: [REDIS_CLIENT],
})
export class RedisCacheModule {}
