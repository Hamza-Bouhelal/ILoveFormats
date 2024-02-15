import { Repository } from "typeorm";
import { Users } from "../entity/User";
import { RefreshToken } from "../entity/RefreshToken";
import { AppDataSource } from "../data-source";
import { Subscription } from "../entity/Subscription";
import { ApiKey } from "../entity/ApiKey";

export class Repositories {
  private constructor() {}

  static init = false;
  static userRepository: Repository<Users>;
  static refreshTokenRepository: Repository<RefreshToken>;
  static subscribtionRepository: Repository<Subscription>;
  static apiKeyRepository: Repository<ApiKey>;

  static getRepositories() {
    if (!this.init) {
      this.userRepository = AppDataSource.getRepository(Users);
      this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
      this.subscribtionRepository = AppDataSource.getRepository(Subscription);
      this.apiKeyRepository = AppDataSource.getRepository(ApiKey);
      this.init = true;
    }
    return {
      userRepository: this.userRepository,
      refreshTokenRepository: this.refreshTokenRepository,
      subscribtionRepository: this.subscribtionRepository,
      apiKeyRepository: this.apiKeyRepository,
    };
  }
}
