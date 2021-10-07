import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", (req, res) => {
      res.send("ok");
    });

    app.listen(4000, () => {
      console.log("Servidor iniciado na porta 4000!");
    });
  })
  .catch((error) => console.log(error));
