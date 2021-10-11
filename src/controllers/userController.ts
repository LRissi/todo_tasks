import { Controller } from "../@types/Controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
  httpGet,
} from "inversify-express-utils";
import { User } from "../models/user";
import { UserService } from "../services/userService";
import { body } from "express-validator";

const postValidator = [
  body("email").notEmpty().withMessage("Email não informado"),
  body("senha").notEmpty().withMessage("Senha não informada"),
];

@controller("/api/user")
export class UserController extends Controller {
  private readonly _userService: UserService;

  public constructor(userService: UserService) {
    super();
    this._userService = userService;
  }

  @httpPost("/", ...postValidator)
  public async create(
    @requestBody() user: User
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this._userService.salvar(user));
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }

  @httpGet("/")
  public async getAll(
    @requestBody() user: User
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this._userService.findAll());
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }
}
