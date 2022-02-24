import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class HttpSpeedTestInterceptor implements NestInterceptor {
   intercept(
      ctx: ExecutionContext,
      next: CallHandler<any>
   ): Observable<any> | Promise<Observable<any>> {
      const startTime = Date.now();

      return next.handle().pipe(
         tap(() => {
            const endTime = Date.now();
            console.log(`Total time: ${endTime - startTime}ms.`);
         })
      );
   }
}
