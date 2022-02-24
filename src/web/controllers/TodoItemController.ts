import { CreateTodoInputModel } from "@application/todoItems/models/CreateTodoInputModel";
import { EditTodoInputModel } from "@application/todoItems/models/EditTodoInputModel";
import { ITodoItemService } from "@application/todoItems/services/TodoItemService";
import { Request, Response } from "express";
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
   Redirect,
   Render,
   Res,
   Session,
} from "@nestjs/common";

@Controller("/todos")
export class TodoItemController {
   constructor(
      @Inject(ITodoItemService)
      private readonly _todoItemService: ITodoItemService
   ) {}

   @Post("/")
   @HttpCode(HttpStatus.CREATED)
   async create(
      @Session() session: Request["session"],
      @Res({ passthrough: true }) res: Response,
      @Body()
      createTodoInput: Omit<CreateTodoInputModel, "userId">
   ) {
      // @ts-ignore
      const { userId } = session.user;

      const newTodoId = await this._todoItemService.create({
         userId,
         ...createTodoInput,
      });
      console.log(newTodoId);
      return newTodoId;
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
   async byUserId(@Param("id") id: string, @Res() res: Response) {
      const todos = await this._todoItemService.getAllByUserId(Number(id));

      return { todos };
   }

   @Delete("/:id")
   @HttpCode(HttpStatus.OK)
   async delete(@Param("id", ParseIntPipe) id: number) {
      await this._todoItemService.delete(id);
      return { message: "Todo item successfully deleted." };
   }
}
