import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { createConnection } from "typeorm";

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection();
  await require("./controllers/index");
});
