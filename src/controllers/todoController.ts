import { Controller } from "../@types/controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
  httpGet,
} from "inversify-express-utils";
import { User } from "../models/user";

@controller("/api/todo")
export class TodoController extends Controller {
  private readonly _todoService: null;
  public constructor(todoService: null) {
    super();
    this._todoService = todoService;
  }

  @httpPost("/")
  public async create(
    @requestBody() user: User
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok({});
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
      return this.ok({});
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
      return this.ok({});
    } catch (e) {
      return this.internalServerError(new Error("Error"));
    }
  }
}
