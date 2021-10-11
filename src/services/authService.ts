import crypto from "crypto";
import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPE_DI } from "../constants/typesDependencyInjection";
import { User } from "../models/user";

type LoginSuccess = {
  id: string;
  email: string;
  token: string;
};

@injectable()
export class AuthService {
  private readonly _usuarioRepository: Repository<User>;
  public constructor(
    @inject(TYPE_DI.UserRepository) usuarioRepository: Repository<User>
  ) {
    this._usuarioRepository = usuarioRepository;
  }

  private singToken(user: User): Promise<string> {
    const secretJwt = process.env.SECRET_JWT
      ? process.env.SECRET_JWT
      : "tokensecret";
    console.log(user);

    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        secretJwt,
        {
          expiresIn: "7 days",
          algorithm: "HS256",
        },
        (err: Error | null, token: string | undefined) => {
          if (err) reject(err);
          if (!token) {
            reject(err);
            return;
          }
          resolve(token);
        }
      );
    });
  }

  public async login(user: User): Promise<LoginSuccess> {
    if (!user.email) {
      throw Error("Email não informado.");
    }
    if (!user.senha) {
      throw Error("Senha não informada.");
    }
    const userLogin: User | undefined = await this.findByEmail(user.email);
    if (!userLogin) {
      throw Error(`Usuário não encontrado.`);
    }

    const hash = crypto.createHash("sha256").update(user.senha).digest("hex");
    if (hash !== userLogin.senha) throw new Error("Senha incorreta");
    delete userLogin.senha;
    const token = await this.singToken(userLogin);
    return {
      id: user.id || "",
      email: user.email,
      token,
    };
  }

  private async findByEmail(email: string): Promise<User | undefined> {
    return await this._usuarioRepository.findOne({
      select: ["id", "senha", "email"],
      where: {
        email,
      },
    });
  }
}
