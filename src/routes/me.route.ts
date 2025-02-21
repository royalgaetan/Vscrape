import { Router } from "express";
import {
  getUserController,
  getUserSessionsController,
} from "../controllers/user.controller";

const meRouter = Router();

// prefix: '/me'

// Me: get infos
meRouter.get("/", getUserController);

// Me: sessions
meRouter.get("/sessions", getUserSessionsController);
// userRouter.delete('/session/:id',  deleteSessionsController)

// meRouter.get('billing/', );

export default meRouter;
