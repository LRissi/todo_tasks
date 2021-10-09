import { interfaces } from "inversify-express-utils";

import { TokenData } from "../utils/token";

export class Principal implements interfaces.Principal {
  public token?: TokenData;

  details: any;

  private logged = false;

  public constructor(token: TokenData | undefined) {
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
