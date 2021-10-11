import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPE_DI } from "../constants/typesDependencyInjection";
import { UserRule } from "../enums/userRule";
import { User } from "../models/user";

@injectable()
export class UserService {
  private readonly _usuarioRepository: Repository<User>;
  public constructor(
    @inject(TYPE_DI.UserRepository) usuarioRepository: Repository<User>
  ) {
    this._usuarioRepository = usuarioRepository;
  }

  public async salvar(user: User): Promise<User> {
    if (!user.email) {
      throw Error("Email não informado.");
    }
    const userByLogin: User | undefined = await this.findByEmail(user.email);
    if (userByLogin && userByLogin.id !== user.id) {
      throw Error(`Usuário já cadastrado com o email '${user.email}'.`);
    }
    const uSave = await this._usuarioRepository.save(
      this._usuarioRepository.create({
        email: user.email,
        senha: user.senha,
        type: UserRule.NORMAL,
      })
    );
    delete uSave.senha;

    return uSave;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this._usuarioRepository.findOne({
      where: {
        email,
      },
    });
  }
}
