export class DefaultConfigValues {
  public static readonly DB_HOST = 'host.docker.internal';
  public static readonly DB_NAME = 'mydb';
  public static readonly DB_USER = 'user';
  public static readonly DB_PASSWORD = 'password';
  public static readonly DB_TYPE = 'mongodb';
  public static readonly DB_PORT = 27017;
  public static readonly APP_PORT = 5000;

  public static readonly ACCESS_SECRET = 'geferfefefefreerf';
  public static readonly REFRESH_SECRET = 'ferferfrfere';
  public static readonly REFRESH_EXP = '30d';
  public static readonly REFRESH_COOKIE_EXP = 60 * 5 * 5;
  public static readonly ACCESS_EXP = '20m';

  public static readonly LOGGER_LEVEL = 'info';
  public static readonly LOGS_PATH = 'data/logs/pino-logger.log';
  
  public static readonly EXP_TIME_OTP = '1h';
  public static readonly SECRET_OTP = '60 * 60';

  public static readonly EMAIL_USER = 'ba413352be30da';
  public static readonly EMAIL_FROM = 'yarosgrerefe@gmail.com';
  public static readonly EMAIL_PASS = '94030e48806f7a';
  public static readonly EMAIL_PORT = 2525;
  public static readonly EMAIL_SECURITY = true;
  public static readonly EMAIL_HOST = 'sandbox.smtp.mailtrap.io';

  public static readonly CLIENT_URL = `http://localhost:${DefaultConfigValues.APP_PORT}`;
}