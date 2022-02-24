import { TodoItemConstants } from "./../../../infrastructure/persistence/common/ModelConstants";
import { Guard } from "../../common/Guard";
import { IValidator } from "../../common/IValidator";
import { CreateTodoInputModel } from "../models/CreateTodoInputModel";
import { Priority } from "../models/TodoItemModel";
import { Injectable } from "@nestjs/common";

export const ICreateTodoValidator = Symbol.for("ICreateTodoValidator");

@Injectable()
export class CreateTodoValidator implements IValidator<CreateTodoInputModel> {
   constructor() {}

   public validate(input: Partial<Omit<CreateTodoInputModel, "id">>) {
      const { title, description, priority } = input;

      if (title) {
         Guard.forStringLength(
            title,
            TodoItemConstants.minTitleLength,
            TodoItemConstants.maxTitleLength
         );
      }
      if (description) {
         Guard.forStringLength(
            description,
            0,
            TodoItemConstants.maxDescriptionLength
         );
      }
      if (priority) {
         Guard.forNumericRange(Priority.toNumber(priority), 1, 4);
      }
   }
}
