import "reflect-metadata";
import { Container } from "inversify";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { bindings } from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";

export default (async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  const app = new InversifyExpressServer(container);
  app.setConfig((expressApp) => {
    expressApp.use(cors());
    expressApp.use(helmet());
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({ extended: false }));
  });
  const server = app.build();

  server.listen(3000, () => {
    console.log(`Server executando em http://127.0.0.1:3000/`);
  });
})();
