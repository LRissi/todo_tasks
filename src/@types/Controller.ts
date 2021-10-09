import { validationResult } from "express-validator";
import { BaseHttpController } from "inversify-express-utils";
import { BadRequestErrorMessageResult } from "inversify-express-utils/dts/results";

export class Controller extends BaseHttpController {
  constructor() {
    super();
  }

  public validationError(): BadRequestErrorMessageResult | null {
    const errosValidacao = validationResult(this.httpContext.request);
    if (!errosValidacao.isEmpty()) {
      return this.badRequest(
        JSON.stringify(errosValidacao.array().map((m) => m.msg))
      );
    }
    return null;
  }
}
