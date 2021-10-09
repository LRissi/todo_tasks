import { Controller } from "../@types/controller";
import { controller } from "inversify-express-utils";

@controller("/api/user")
export class UserController extends Controller {}
