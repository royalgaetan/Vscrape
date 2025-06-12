import { Router } from "express";
import {
  deleteUserSessionController,
  getUserController,
  getUserSessionsController,
} from "../controllers/user.controller";

const meRouter = Router();

// prefix: '/me'

// Me: get infos
meRouter.get("/", getUserController);

// Me: sessions
meRouter.get("/sessions", getUserSessionsController);
meRouter.delete("/session/:id", deleteUserSessionController);

// meRouter.get('billing/', );

export default meRouter;
