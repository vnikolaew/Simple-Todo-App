import { ApplicationException } from "@application/common/exceptions/ApplicationExceptions";
import {
   ArgumentsHost,
   Catch,
   ExceptionFilter,
   HttpException,
   HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch(ApplicationException)
export class AppExceptionHandler
   implements ExceptionFilter<ApplicationException>
{
   catch(exception: ApplicationException, host: ArgumentsHost) {
      const httpHost = host.switchToHttp();
      const res = httpHost.getResponse<Response>();

      return res.status(HttpStatus.BAD_REQUEST).json({
         message: exception.message,
         statusCode: HttpStatus.BAD_REQUEST,
      });
   }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
   catch(exception: HttpException, host: ArgumentsHost) {
      const httpHost = host.switchToHttp();
      const res = httpHost.getResponse<Response>();

      return res.status(HttpStatus.NOT_FOUND).render("page-not-found", {
         message: "Page not found.",
         statusCode: HttpStatus.NOT_FOUND,
      });
   }
}
