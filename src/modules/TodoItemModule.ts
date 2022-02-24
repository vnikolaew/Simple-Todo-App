import {
   ITodoItemService,
   TodoItemService,
} from "@application/todoItems/services/TodoItemService";
import {
   CreateTodoValidator,
   ICreateTodoValidator,
} from "@application/todoItems/validators/CreateTodoValidator";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TodoItemController } from "@web/controllers/TodoItemController";
import { RedirectToLoginPageMiddleware } from "@web/middleware";
import { DatabaseModule } from "./DatabaseModule";

@Module({
   imports: [DatabaseModule],
   controllers: [TodoItemController],
   providers: [
      {
         provide: ITodoItemService,
         useClass: TodoItemService,
      },
      {
         provide: ICreateTodoValidator,
         useClass: CreateTodoValidator,
      },
   ],
})
export class TodoItemModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(RedirectToLoginPageMiddleware)
         .forRoutes(TodoItemController);
   }
}
