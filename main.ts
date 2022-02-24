import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./src/app.module";
import { static as express_static } from "express";
import { engine } from "express-handlebars";
import {
   AppExceptionHandler,
   HttpExceptionFilter,
} from "@web/exceptions/ExceptionFilters";
import { HttpSpeedTestInterceptor } from "@web/interceptors/HttpSpeedTestInterceptor";
import { ShutdownSignal } from "@nestjs/common";

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
   applyTemplateEngine(app);
   app.useGlobalFilters(new AppExceptionHandler(), new HttpExceptionFilter());
   app.useGlobalInterceptors(new HttpSpeedTestInterceptor());
   app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

   await app.listen(3000, () => {
      console.log(` 🚀 Server running on port 3000 ...`);
   });
}

bootstrap();

function applyTemplateEngine(app: NestExpressApplication) {
   // Setting up HBS view engine with Nest / Express:
   app.setViewEngine("hbs");
   app.engine(
      "hbs",
      engine({
         layoutsDir: join(__dirname, "..", "src", "web", "views", "layouts"),
         extname: ".hbs",
      })
   );
   app.setBaseViewsDir(join(__dirname, "..", "src", "web", "views"));
   app.getHttpAdapter().use(
      "/public",
      express_static(join(__dirname, "..", "src", "web", "public"))
   );
}
