import { interfaces } from "inversify-express-utils";
import { JwtPayload } from "jsonwebtoken";
import { UserRule } from "../enums/userRule";

export class Principal implements interfaces.Principal {
  public token?: JwtPayload;

  details: any;

  private logged = false;

  public constructor(token: JwtPayload | undefined) {
    this.logged = token !== null;
    this.token = token;
    this.details = token;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(this.logged);
  }

  public isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(resourceId === 1111);
  }

  public isInRole(type: UserRule): Promise<boolean> {
    return Promise.resolve(
      this.token ? this.token?.type.indexOf(type) >= 0 : false
    );
  }
}
