import dotenv from 'dotenv';

dotenv.config();

const missingEnv = (key: string): Error =>
  new Error(`La variable d'environnement ${key} est requise.`);

export const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw missingEnv(key);
  }
  return value;
};
