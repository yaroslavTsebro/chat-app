import { ConfigValues } from '../constant/config-values';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { DefaultConfigValues } from '../constant/default-config-values';

let env = process.env.NODE_ENV;
fs.access(
  ConfigValues.CONFIG_PATH + ConfigValues.ENV_EXTENSION + env,
  (err) => {
    dotenv.config({
      path: ConfigValues.CONFIG_PATH + ConfigValues.DEVELOPMENT_EVN,
    });
  }
);
dotenv.config({
  path: ConfigValues.CONFIG_PATH + ConfigValues.ENV_EXTENSION + env,
});

export const config = {
  db: {
    DB_HOST: process.env.DB_HOST || DefaultConfigValues.DB_HOST,
    DB_NAME: process.env.DB_NAME || DefaultConfigValues.DB_NAME,
    DB_TYPE: process.env.DB_TYPE || DefaultConfigValues.DB_TYPE,
    DB_USER: process.env.DB_USER || DefaultConfigValues.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD || DefaultConfigValues.DB_PASSWORD,
    DB_PORT: Number(process.env.DB_PORT) || DefaultConfigValues.DB_PORT,
  },
  env: {
    APP_MODE_IS_PROD: env == 'production',
  },
  server: {
    url: process.env.CLIENT_URL || DefaultConfigValues.CLIENT_URL,
    port: Number(process.env.APP_PORT) || DefaultConfigValues.APP_PORT,
    jwt: {
      accessSecret:
        process.env.ACCESS_SECRET || DefaultConfigValues.ACCESS_SECRET,
      refreshSecret:
        process.env.REFRESH_SECRET || DefaultConfigValues.REFRESH_SECRET,
      expiresInRefresh:
        process.env.REFRESH_EXP || DefaultConfigValues.REFRESH_EXP,
      expiresInRefreshCookie:
        Number(process.env.REFRESH_COOKIE_EXP) ||
        DefaultConfigValues.REFRESH_COOKIE_EXP,
      expiresInAccess: process.env.ACCESS_EXP || DefaultConfigValues.ACCESS_EXP,
    },
    logger: {
      level: process.env.LOGGER_LEVEL || DefaultConfigValues.LOGGER_LEVEL,
      path: process.env.LOGS_PATH || DefaultConfigValues.LOGS_PATH,
    },
    cors: {
      origin: '*',
    },
    otp: {
      expires: process.env.EXP_TIME_OTP || DefaultConfigValues.EXP_TIME_OTP,
      secret: process.env.SECRET_OTP || DefaultConfigValues.SECRET_OTP,
    },
  },
  mailer: {
    username: process.env.EMAIL_USER || DefaultConfigValues.EMAIL_USER,
    from: process.env.EMAIL_FROM || DefaultConfigValues.EMAIL_FROM,
    password: process.env.EMAIL_PASS || DefaultConfigValues.EMAIL_PASS,
    port: Number(process.env.EMAIL_PORT) || DefaultConfigValues.EMAIL_PORT,
    security:
      Boolean(process.env.EMAIL_SECURITY) || DefaultConfigValues.EMAIL_SECURITY,
    host: process.env.EMAIL_HOST || DefaultConfigValues.EMAIL_HOST,
  },
};
