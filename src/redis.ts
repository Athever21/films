// import "isomophric-fetch";
import { RedisClientType, createClient } from "redis";
import { BaseConfig } from '@/config/base.config';

interface CustomNodeJsGlobal {
  redisClient: RedisClientType;
}

declare const global: CustomNodeJsGlobal;

const client = global.redisClient || createClient({
  url: `redis://${BaseConfig.redisHost}:${BaseConfig.redisPort}`,
  password: BaseConfig.redisPassword
});

global.redisClient = client;

(async() => {
  await client.connect();
})()

export default client;
