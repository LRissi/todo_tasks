import { Controller } from "../@types/Controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";
import { User } from "../models/user";
import { UserService } from "../services/userService";

@controller("/api/user")
export class UserController extends Controller {
  private readonly _userService: UserService;

  public constructor(userService: UserService) {
    super();
    this._userService = userService;
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
      return this.ok(await this._userService.salvar(user));
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }
}
