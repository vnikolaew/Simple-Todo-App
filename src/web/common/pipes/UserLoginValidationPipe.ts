import {
   ArgumentMetadata,
   BadRequestException,
   Injectable,
   PipeTransform,
} from "@nestjs/common";

@Injectable()
export class UserLoginValidationPipe implements PipeTransform {
   transform(value: any, metadata: ArgumentMetadata) {
      if (!value.hasOwnProperty("email") || !value.hasOwnProperty("password")) {
         throw new BadRequestException("Missing login fields.");
      }
      if (
         typeof value.email !== "string" ||
         typeof value.password !== "string"
      ) {
         throw new BadRequestException("Invalid fields.");
      }
      const { email, password } = value;
      return { email, password };
   }
}
