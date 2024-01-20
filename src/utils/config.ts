import dotenv from "dotenv";

dotenv.config();

const getEnvVariable = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }

  return value;
};

interface Config {
  PORT: number;
  API_KEY: string;
}

export const getConfig = (): Config => ({
  PORT: Number(process.env.PORT) || 8080,
  API_KEY: getEnvVariable("API_KEY"),
});
