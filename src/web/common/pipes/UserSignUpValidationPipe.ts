import {
   ArgumentMetadata,
   BadRequestException,
   Injectable,
   PipeTransform,
} from "@nestjs/common";

@Injectable()
export class UserSignUpValidationPipe implements PipeTransform {
   transform(value: any, metadata: ArgumentMetadata) {
      if (
         !value.hasOwnProperty("email") ||
         !value.hasOwnProperty("password") ||
         !value.hasOwnProperty("firstName") ||
         !value.hasOwnProperty("lastName")
      ) {
         throw new BadRequestException("Missing sign-up fields.");
      }
      if (
         typeof value.email !== "string" ||
         typeof value.password !== "string" ||
         typeof value.firstName !== "string" ||
         typeof value.lastName !== "string"
      ) {
         throw new BadRequestException("Invalid fields.");
      }
      const { email, password, firstName, lastName } = value;
      return { email, password, firstName, lastName };
   }
}
