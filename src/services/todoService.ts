import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPE_DI } from "../constants/typesDependencyInjection";
import { StateTODO } from "../enums/stateTodo";
import { Todo } from "../models/todo";
import { User } from "../models/user";

@injectable()
export class TodoService {
  private readonly _todoRepository: Repository<Todo>;
  public constructor(
    @inject(TYPE_DI.TodoRepository) todoRepository: Repository<Todo>
  ) {
    this._todoRepository = todoRepository;
  }

  public async salvar(todo: Todo): Promise<Todo> {
    if (todo.id) {
      const todoToUpdate = await this._todoRepository.findOne(todo);
      if (!todoToUpdate) {
        throw new Error("Todo não encontrado!");
      }
      if (todoToUpdate?.estado === StateTODO.CLOSED) {
        throw new Error(
          "Esse TODO não pode ser alterado pois já foi finalizado."
        );
      }
      todo.titulo = todoToUpdate?.titulo;
    }
    return await this._todoRepository.save(todo);
  }

  public async findAll(): Promise<Todo[]> {
    const todos = await this._todoRepository.find();
    return todos.map((t) => {
      if (!t.dataPrazo) {
        return t;
      }
      t.estaAtrasado = Boolean(t.dataPrazo > new Date());
      return t;
    });
  }

  public async finalizarTodo(id: string) {
    const todo = await this._todoRepository.findOne({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new Error("Todo não encontrado!");
    }
    if (todo.estado === StateTODO.CLOSED) {
      throw new Error("Todo já foi finalizado!");
    }
    todo.dataFinalizacao = new Date();
    todo.estado = StateTODO.CLOSED;
    this._todoRepository.save(todo);
  }

  public async findByUser(user: User): Promise<Todo[]> {
    return await this._todoRepository.find({
      where: {
        user,
      },
    });
  }
}
