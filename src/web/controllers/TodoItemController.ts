import { CreateTodoInputModel } from "@application/todoItems/models/CreateTodoInputModel";
import { SessionUser } from "./IdentityController";
import { EditTodoInputModel } from "@application/todoItems/models/EditTodoInputModel";
import { ITodoItemService } from "@application/todoItems/services/TodoItemService";
import { Response } from "express";
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpStatus,
   Inject,
   Param,
   ParseIntPipe,
   Post,
   Put,
   Render,
   Res,
} from "@nestjs/common";
import { User } from "@web/common/decorators/UserDecorator";

@Controller("/todos")
export class TodoItemController {
   constructor(
      @Inject(ITodoItemService)
      private readonly _todoItemService: ITodoItemService
   ) {}

   @Post("/")
   @HttpCode(HttpStatus.CREATED)
   async create(
      @User() user: SessionUser,
      @Body()
      createTodoInput: Omit<CreateTodoInputModel, "userId">
   ) {
      // @ts-ignore
      const { userId } = user;

      const newTodo = await this._todoItemService.create({
         userId,
         ...createTodoInput,
      });
      return newTodo;
   }

   @Put("/:id")
   @HttpCode(HttpStatus.CREATED)
   async edit(
      @Param("id", ParseIntPipe) id: number,
      @Body() body: Omit<EditTodoInputModel, "todoId">
   ) {
      return await this._todoItemService.edit({
         todoId: id,
         ...body,
      });
   }

   @Put("/toggle-complete/:id")
   @HttpCode(HttpStatus.CREATED)
   async toggleTodoCompletion(@Param("id", ParseIntPipe) id: number) {
      return await this._todoItemService.toggleComplete(id);
   }

   @Get("/:id")
   @Render("todos-page")
   @HttpCode(HttpStatus.OK)
   async byUserId(@User() user: SessionUser) {
      const todos = await this._todoItemService.getAllByUserId(user.userId);

      return { todos };
   }

   @Delete("/:id")
   @HttpCode(HttpStatus.OK)
   async delete(@Param("id", ParseIntPipe) id: number) {
      await this._todoItemService.delete(id);
      return { message: "Todo item successfully deleted." };
   }
}
