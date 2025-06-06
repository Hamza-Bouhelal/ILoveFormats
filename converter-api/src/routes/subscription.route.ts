import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createApiKey,
  deleteApiKey,
  getApiKey,
} from "../controllers/subscription.controller";
import { bodyValidator } from "../middlewares/joi.middleware";
import { apiKeySchema } from "./subscription.validation";

export const subscriptionRouter = () => {
  const router = Router();

  router.get("/api-key", authMiddleware(), getApiKey);

  router.post(
    "/api-key",
    authMiddleware(),
    bodyValidator(apiKeySchema),
    createApiKey
  );

  router.delete("/api-key/:id", authMiddleware(), deleteApiKey);

  return router;
};
