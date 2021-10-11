import * as express from "express";
import { Container } from "inversify";
import { Repository } from "typeorm";

import { container } from "../config/container";
import { TYPE_DI } from "../constants/typesDependencyInjection";
import { UserRule } from "../enums/userRule";
import { User } from "../models/user";
import { getTokenFromHeader, verifyToken } from "../utils/token";

function authMiddlewareFactory(containerMiddleware: Container) {
  return (config?: { type: UserRule[] }) => {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const usuarioRepository = containerMiddleware.get<Repository<User>>(
        TYPE_DI.UserRepository
      );

      (async () => {
        const header = req.headers.authorization as string;
        const token = getTokenFromHeader(header);

        if (token === null) {
          res.status(401).send("Token inválido");
        } else {
          try {
            const decoded = await verifyToken(token);
            const usuario = await usuarioRepository.findOneOrFail(decoded.id);
            if (
              !config ||
              !config.type ||
              !config.type.length ||
              (usuario.type && config.type.indexOf(usuario.type) >= 0)
            ) {
              next();
            } else {
              res.status(403).send("Usuário sem permissão");
            }
          } catch (error) {
            console.log(error);
            res.status(401).send(error);
          }
        }
      })();
    };
  };
}

const authMiddleware = authMiddlewareFactory(container);

export { authMiddleware };
