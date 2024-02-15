import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { getConfig } from "./utils/config";
import { RefreshToken } from "./entity/RefreshToken";
import { Subscription } from "./entity/Subscription";
import { ApiKey } from "./entity/ApiKey";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = getConfig();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Users, RefreshToken, Subscription, ApiKey],
  migrationsTableName: "migrations",
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
