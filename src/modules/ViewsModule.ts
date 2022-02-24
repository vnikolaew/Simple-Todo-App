import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ViewController } from "@web/controllers/ViewController";
import { RedirectToLoginPageMiddleware } from "@web/middleware";

@Module({
   controllers: [ViewController],
})
export class ViewsModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(RedirectToLoginPageMiddleware).forRoutes("/main");
   }
}
