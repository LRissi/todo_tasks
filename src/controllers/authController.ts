import { Controller } from "../@types/Controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";
import { User } from "../models/user";
import { AuthService } from "../services/authService";

@controller("/api/auth")
export class AuthController extends Controller {
  private readonly _authService: AuthService;
  public constructor(authService: AuthService) {
    super();
    this._authService = authService;
  }

  @httpPost("/")
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
      return this.internalServerError(new Error("Error"));
    }
  }
}
