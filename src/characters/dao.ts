import { RedisClientType } from "redis";
import fetch from "@/utils/fetch";

export class CharactersDao {
  constructor(private readonly redis: RedisClientType) {}

  async getCharacter(url: string) {
    const cached = await this.redis.get(url);

    if (!cached) {
      let res = (await fetch(url)) as any;

      await this.redis.set(url, JSON.stringify(res));

      return res;
    }

    return JSON.parse(cached);
  }
}