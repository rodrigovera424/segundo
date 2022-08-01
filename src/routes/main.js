//----------* IMPORTS *----------//
import { Router } from "express";
import userAuthMW from "../middlewares/userAuth.js";

const mainRouter = new Router();

mainRouter.get("/login", userAuthMW.login);

mainRouter.get("/logout", userAuthMW.logout);

export { mainRouter };
