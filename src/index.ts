import "reflect-metadata";
import { container } from "./config/container";
import App from "./config/express";

(async () => {
  const server = await new App(container).createApp();

  server.listen(3000, () => {
    console.log(`Server executando em http://127.0.0.1:3000/`);
  });
})();
