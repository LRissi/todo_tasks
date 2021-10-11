import { AsyncContainerModule } from "inversify";
import { getRepository, Repository } from "typeorm";
import { createConnection, getConnection } from "typeorm";
import { TYPE_DI } from "./constants/typesDependencyInjection";
import { UserRule } from "./enums/userRule";
import { Todo } from "./models/todo";
import { User } from "./models/user";
import { AuthService } from "./services/authService";
import { TodoService } from "./services/todoService";
import { UserService } from "./services/userService";

const autoInsertAdmin = async () => {
  console.log("Admin Inserido");
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        email: "admin@admin.com.br",
        senha:
          "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        type: UserRule.ADMIN,
      },
    ])
    .execute();
};

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection();
  await autoInsertAdmin();
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
