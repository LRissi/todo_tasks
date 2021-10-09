import jwt, { JwtPayload } from "jsonwebtoken";

export type TokenData = {
  id: number;
  type: UserRule;
};

export function getTokenFromHeader(header: string): string {
  // @ts-ignore
  if (!header || !header.includes("Bearer ")) return null;

  const token = header.split("Bearer ")[1];
  return token;
}

export function verifyToken(token: string): Promise<TokenData> {
  const secretJwt: string = process.env.SECRET_JWT
    ? process.env.SECRET_JWT
    : "^d3VeL0peR$";
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretJwt,
      {
        algorithms: ["HS256"],
        complete: true,
      },
      (err: jwt.VerifyErrors | null, decoded: TokenData | undefined) => {
        if (err) reject(err);
        if (!decoded) return;
        resolve(decoded);
      }
    );
  });
}
