import bcrypt from "bcrypt";
import { config } from "@/app/utils/env-config";

export const hashedPassword = async (password: string) => {
  const salts = parseInt(config.saltRounds || "10");
  const salt = await bcrypt.genSalt(salts);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
