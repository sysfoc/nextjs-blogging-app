// app/utils/env-config.ts
const _config = {
  mongoDb: process.env.MONGODB_URI,
  dbName: process.env.DATABASE,
  saltRounds: process.env.SALT_ROUNDS,
  jwtSecretKey: process.env.JWT_SECRET_KEY
};
export const config = Object.freeze(_config);