import { Request, Response, NextFunction } from "express";
import { Users } from "../entity/User";
import { verifyToken } from "../services/auth.service";
import { Repositories } from "../utils/repositories.factory";

const sendUnauthorized = (res: Response) => {
  res.status(401).send({ error: "UNAUTHORIZED" });
};

export interface UserPayload {
  email: string;
}

export interface AuthCustomRequest extends Request {
  user: Users;
}

const { apiKeyRepository } = Repositories.getRepositories();

export const authMiddleware = (allowApiKey = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (allowApiKey) {
      const apiKey = req.headers["x-api-key"];
      if (apiKey && !Array.isArray(apiKey)) {
        const apiKeyExists = await apiKeyRepository.findOne({
          where: { key: apiKey },
        });
        if (apiKeyExists) {
          (req as AuthCustomRequest).user = apiKeyExists.user;
          return next();
        }
      }
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) return sendUnauthorized(res);
    const token = authHeader.split(" ")[1];
    if (!token) return sendUnauthorized(res);
    try {
      const user = await verifyToken(token);
      if (!user) return sendUnauthorized(res);
      (req as AuthCustomRequest).user = user;
      next();
    } catch (err) {
      sendUnauthorized(res);
    }
  };
};
