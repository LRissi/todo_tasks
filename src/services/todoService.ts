import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPE_DI } from "../constants/typesDependencyInjection";
import { Todo } from "../models/todo";
import { User } from "../models/user";

@injectable()
export class TodoService {
  private readonly _todoRepository: Repository<Todo>;
  public constructor(
    @inject(TYPE_DI.UserRepository) todoRepository: Repository<Todo>
  ) {
    this._todoRepository = todoRepository;
  }

  public async salvar(todo: Todo): Promise<Todo> {
    return await this._todoRepository.save(todo);
  }

  public async findAll(): Promise<Todo[]> {
    return await this._todoRepository.find();
  }

  public async findByUser(user: User): Promise<Todo[]> {
    return await this._todoRepository.find({
      where: {
        user,
      },
    });
  }
}
