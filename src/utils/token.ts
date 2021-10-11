import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRule } from "../enums/userRule";

export function getTokenFromHeader(header: string): string {
  // @ts-ignore
  if (!header || !header.includes("Bearer ")) return null;

  const token = header.split("Bearer ")[1];
  return token;
}

export function verifyToken(token: string): Promise<JwtPayload> {
  const secretJwt: string = process.env.SECRET_JWT
    ? process.env.SECRET_JWT
    : "^LuC4sR1sS1$";
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretJwt,
      {
        algorithms: ["HS256"],
        complete: true,
      },
      (err: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
        if (err) reject(err);
        if (!decoded) return;
        resolve(decoded);
      }
    );
  });
}
