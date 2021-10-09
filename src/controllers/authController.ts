import { Controller } from "../@types/controller";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";
import { User } from "../models/user";

@controller("/api/auth")
export class AuthController extends Controller {
  private readonly _authService: null;
  public constructor(authService: null) {
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
      return this.ok({});
    } catch (e) {
      return this.internalServerError(new Error("Error"));
    }
  }

  @httpPost("/create")
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
}
