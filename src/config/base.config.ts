export class BaseConfig {
  public static baseApiUrl = 'https://swapi.dev/api/'

  public static dbUrl = process.env.DATABASE_URI;

  public static redisHost = process.env.REDIS_HOST;

  public static redisPort = process.env.REDIS_PORT;

  public static redisPassword = process.env.REDIS_PASSWORD;
}