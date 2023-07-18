export class DefaultConfigValues {
  public static readonly DB_HOST = 'localhost'; // host.docker.internal
  public static readonly DB_NAME = 'database';
  public static readonly DB_USER = 'postgres';
  public static readonly DB_PASSWORD = 'zsbldqpk56';
  public static readonly DB_TYPE = 'postgresql';
  public static readonly DB_PORT = 5432;
  public static readonly APP_PORT = 3000;

  public static readonly ACCESS_SECRET = 'geferfefefefreerf';
  public static readonly REFRESH_SECRET = 'ferferfrfere';
  public static readonly REFRESH_EXP = '30d';
  public static readonly ACCESS_EXP = '20m';

  public static readonly LOGGER_LEVEL = 'info';
  public static readonly LOGS_PATH = '../backend/data/logs/pino-logger.log';
}
