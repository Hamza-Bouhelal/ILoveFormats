import { Request, Response } from "express";
import { AuthCustomRequest } from "../middlewares/auth.middleware";
import { Repositories } from "../utils/repositories.factory";
import { generateApiKey } from "generate-api-key";

const DEFAULT_API_KEY_LENGTH = 30;

const { apiKeyRepository } = Repositories.getRepositories();

export async function getApiKey(req: Request, res: Response) {
  const { user } = req as AuthCustomRequest;
  const apiKeys = (
    await apiKeyRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    })
  )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ user, ...rest }) => rest);
  res.status(200).json(apiKeys);
}

export async function createApiKey(req: Request, res: Response) {
  const { user } = req as AuthCustomRequest;
  const { name, expiresAt } = req.body;
  const apiKey = generateApiKey({ length: DEFAULT_API_KEY_LENGTH });
  const rowWithUser = await apiKeyRepository.save({
    name,
    key: Array.isArray(apiKey) ? apiKey[0] : apiKey,
    user,
    expired_at: expiresAt,
  });
  const { user: _, ...row } = rowWithUser;
  res.status(201).json(row);
}

export async function deleteApiKey(req: Request, res: Response) {
  const { id } = req.params;
  const apiKey = await apiKeyRepository.findOne({ where: { id } });
  if (!apiKey || apiKey.user.id !== (req as AuthCustomRequest).user.id) {
    return res.status(404).json({ message: "API key not found" });
  }
  await apiKeyRepository.delete({ id: apiKey.id });
  res.status(204).end();
}
