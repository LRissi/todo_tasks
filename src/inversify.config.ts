import { AsyncContainerModule } from "inversify";
import { getRepository, Repository } from "typeorm";
import { createConnection } from "typeorm";
import { TYPE_DI } from "./constants/typesDependencyInjection";
import { Todo } from "./models/todo";
import { User } from "./models/user";
import { AuthService } from "./services/authService";
import { TodoService } from "./services/todoService";
import { UserService } from "./services/userService";

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection();
  await require("./controllers/index");

  bind<Repository<User>>(TYPE_DI.UserRepository)
    .toDynamicValue(() => {
      return getRepository<User>(User);
    })
    .inRequestScope();

  bind<Repository<Todo>>(TYPE_DI.TodoRepository)
    .toDynamicValue(() => {
      return getRepository<Todo>(Todo);
    })
    .inRequestScope();

  bind<TodoService>(TodoService).toSelf();
  bind<AuthService>(AuthService).toSelf();
  bind<UserService>(UserService).toSelf();
});
