import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { JwtPayload } from "jsonwebtoken";

import { Principal } from "../@types/Principal";
import { getTokenFromHeader, verifyToken } from "../utils/token";

@injectable()
export default class UserLoggedProvider implements interfaces.AuthProvider {
  public async getUser(
    req: Request,
    __: Response,
    _: NextFunction
  ): Promise<interfaces.Principal> {
    const header = req.headers.authorization as string;
    const token = getTokenFromHeader(header);
    let tokenData: JwtPayload | undefined;

    try {
      if (token) tokenData = await verifyToken(token);
    } catch (error) {
      console.log(error);
      tokenData = undefined;
    }

    const principal = new Principal(tokenData);
    return principal;
  }
}
