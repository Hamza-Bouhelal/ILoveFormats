import dotenv from "dotenv";

dotenv.config();

export const getConfig = () => ({
  PORT: Number(process.env.PORT) || 8080,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "1234567890",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "0987654321",
});
