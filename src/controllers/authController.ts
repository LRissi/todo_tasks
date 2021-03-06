import { Controller } from "../@types/Controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";
import { User } from "../models/user";
import { AuthService } from "../services/authService";
import { body } from "express-validator";

const loginValidator = [
  body("email").notEmpty().withMessage("Email não informado"),
  body("senha").notEmpty().withMessage("Senha não informada"),
];

@controller("/api/auth")
export class AuthController extends Controller {
  private readonly _authService: AuthService;
  public constructor(authService: AuthService) {
    super();
    this._authService = authService;
  }

  @httpPost("/", ...loginValidator)
  public async login(
    @requestBody() user: User
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this._authService.login(user));
    } catch (e) {
      if (e instanceof Error) {
        return this.internalServerError(e);
      }
      return this.internalServerError();
    }
  }
}
