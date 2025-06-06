import { verify } from "jsonwebtoken";
import { Users } from "../entity/User";
import { getConfig } from "../utils/config";
import { UserPayload } from "../middlewares/auth.middleware";
import { Repositories } from "../utils/repositories.factory";

const { ACCESS_TOKEN_SECRET } = getConfig();

export const verifyToken = async (
  token: string
): Promise<Users | undefined> => {
  try {
    const { userRepository } = Repositories.getRepositories();
    const user = verify(token, ACCESS_TOKEN_SECRET) as UserPayload;
    const users = await userRepository.find({
      where: { email: user.email },
    });
    if (users.length === 0) return;
    return users[0];
  } catch (err) {
    // failed to verify token
  }
};
