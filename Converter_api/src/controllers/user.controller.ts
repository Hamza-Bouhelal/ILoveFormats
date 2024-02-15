import { Request, Response } from "express";
import { Users } from "../entity/User";
import { RefreshToken } from "../entity/RefreshToken";
import { sign, verify } from "jsonwebtoken";
import { getConfig } from "../utils/config";
import { hash, compare } from "bcrypt";
import { AuthCustomRequest, UserPayload } from "../middlewares/auth.middleware";
import { Subscription } from "../entity/Subscription";
import { SubscriptionLevel } from "../utils/types";
import { subscriptionModel } from "../app.data";
import { AppDataSource } from "../data-source";
import { Repositories } from "../utils/repositories.factory";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = getConfig();

const { userRepository, refreshTokenRepository } =
  Repositories.getRepositories();

function generateAccessToken(user: UserPayload) {
  return sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

function generateRefreshToken(user: UserPayload) {
  return sign(user, REFRESH_TOKEN_SECRET);
}

async function auth(user: UserPayload, refreshTokenExisting?: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = refreshTokenExisting || generateRefreshToken(user);
  if (!refreshTokenExisting)
    await refreshTokenRepository.save({ token: refreshToken });
  return { accessToken, refreshToken };
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const users = await userRepository.find({ where: { email } });
  if (users.length) {
    return res.status(409).json({ error: "User already exists" });
  }
  const hashedPassword = await hash(password, 10);

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    const newSubscription = await transactionalEntityManager.save(
      Subscription,
      {
        subscription_type: SubscriptionLevel.Free,
        converts: subscriptionModel[SubscriptionLevel.Free].monthlyRequests,
      }
    );
    await transactionalEntityManager.save(Users, {
      email,
      password: hashedPassword,
      subscription: newSubscription,
    });
  });

  return res.status(201).json({ ...(await auth({ email })) });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const users = await userRepository.find({ where: { email } });
  if (!users.length) {
    return res.status(404).json({ error: "User not found" });
  }
  const user = users[0];
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  return res.status(200).json({ ...(await auth({ email })) });
}

export async function logout(req: Request, res: Response) {
  const { user } = req as AuthCustomRequest;
  const refreshTokens = await refreshTokenRepository.find({});
  refreshTokens.forEach(async (refreshToken: RefreshToken) => {
    try {
      const decodedToken = verify(refreshToken.token, REFRESH_TOKEN_SECRET);
      if (
        !(typeof decodedToken == "string") &&
        decodedToken.email === user.email
      ) {
        await refreshTokenRepository.delete({
          token: refreshToken.token,
        });
      }
    } catch (err) {
      // Do nothing
    }
  });
  res.status(200).send({ error: "User logged out successfully" });
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  const token = await refreshTokenRepository.findOne({
    where: { token: refreshToken },
  });

  if (!token) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  try {
    const decodedToken = verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (typeof decodedToken == "string") {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const { email } = decodedToken;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ ...(await auth({ email }, refreshToken)) });
  } catch (err) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
}
