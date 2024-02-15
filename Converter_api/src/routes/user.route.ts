import { Router, Response, Request } from "express";
import * as userController from "../controllers/user.controller";
import { bodyValidator } from "../middlewares/joi.middleware";
import { authSchema, refreshTokenSchema } from "./user.validation";
import {
  AuthCustomRequest,
  authMiddleware,
} from "../middlewares/auth.middleware";

export const userRouter = () => {
  const router = Router();

  router.post("/signup", bodyValidator(authSchema), userController.register);

  router.post("/login", bodyValidator(authSchema), userController.login);

  router.post(
    "/refresh-token",
    bodyValidator(refreshTokenSchema),
    userController.refreshToken
  );

  router.get("/logout", authMiddleware(), userController.logout);

  router.get("/me", authMiddleware(), (req: Request, res: Response) => {
    res.json({ user: (req as AuthCustomRequest).user.email });
  });

  return router;
};
