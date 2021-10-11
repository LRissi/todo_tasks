import "reflect-metadata";
import { Container } from "inversify";
import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import cors from "cors";
import { bindings } from "../inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import UserLoggedProvider from "../middlewares/userLoggedProvider";
import { container } from "./container";

class App {
  private _container: Container;
  constructor(_container: Container) {
    this._container = container;
  }
  public async createApp(): Promise<express.Application> {
    await this._container.loadAsync(bindings);
    const app = new InversifyExpressServer(
      this._container,
      null,
      null,
      null,
      UserLoggedProvider
    );
    app.setConfig((expressApp) => {
      expressApp.use(cors());
      expressApp.use(helmet());
      expressApp.use(bodyParser.json());
      expressApp.use(bodyParser.urlencoded({ extended: false }));
    });
    return app.build();
  }
}

export default App;
