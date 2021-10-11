import { Controller } from "../@types/Controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
  httpGet,
  httpPut,
  requestParam,
} from "inversify-express-utils";
import { User } from "../models/user";
import { TodoService } from "../services/todoService";
import { Todo } from "../models/todo";
import { authMiddleware } from "../middlewares/authMiddleware";

@controller("/api/todo", authMiddleware())
export class TodoController extends Controller {
  private readonly _todoService: TodoService;
  public constructor(todoService: TodoService) {
    super();
    this._todoService = todoService;
  }

  @httpPost("/")
  public async create(
    @requestBody() todo: Todo
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    if (todo.id) {
      delete todo.id;
    }
    todo.user = this.httpContext.user.details.payload;
    try {
      return this.ok(await this._todoService.salvar(todo));
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }

  @httpPut("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() todo: Todo
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    todo.id = id;
    try {
      return this.ok(await this._todoService.salvar(todo));
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }

  @httpPut("/:id/finalizar")
  public async finalizar(
    @requestParam("id") id: string
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      await this._todoService.finalizarTodo(id);
      return this.ok({
        success: true,
        message: "Seu TODO foi finalizado com sucesso!",
      });
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }

  @httpGet("/")
  public async getByUser(): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    const user = this.httpContext.user.details.payload;
    try {
      return this.ok(await this._todoService.findByUser(user));
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }

  @httpGet("/admin")
  public async getAll(
    @requestBody() user: User
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this._todoService.findAll());
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }
}
