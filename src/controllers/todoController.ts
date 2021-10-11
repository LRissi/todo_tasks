import { Controller } from "../@types/Controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
  httpGet,
} from "inversify-express-utils";
import { User } from "../models/user";
import { TodoService } from "../services/todoService";

@controller("/api/todo")
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
    try {
      return this.ok(await this._todoService.salvar(todo));
    } catch (e) {
      return this.internalServerError(new Error("Error"));
    }
  }

  @httpGet("/")
  public async getByUser(
    @requestBody() user: User
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this._todoService.findByUser(user));
    } catch (e) {
      return this.internalServerError(new Error("Error"));
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
      return this.internalServerError(new Error("Error"));
    }
  }
}
