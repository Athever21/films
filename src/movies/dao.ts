import { BaseConfig } from "@/config/base.config";
import { RedisClientType } from "redis";
import fetch from "@/utils/fetch";
import { MovieSerializer } from "./serializer";
import { Movie } from "./interaces";
import { CharactersDao } from "@/characters/dao";

export class MovieDao {
  constructor(
    private readonly redis: RedisClientType,
    private readonly characterDao: CharactersDao
  ) {}

  async getAllMovies() {
    const cached = await this.redis.get("allMovies");

    if (!cached) {
      const url = `${BaseConfig.baseApiUrl}/films?format=json`;
      let res = (await fetch(url)) as any;

      const serialized = res.results.map((x: Movie) =>
        MovieSerializer.toAllMovies(x)
      );

      while (res.next) {
        serialized.conact(
          res.results.map((x: Movie) => MovieSerializer.toAllMovies(x))
        );
      }

      await this.redis.set("allMovies", JSON.stringify(serialized));

      return serialized;
    }

    return JSON.parse(cached);
  }

  async getMovie(id: number) {
    const cached = await this.redis.get(`Movie-${id}`);

    if (!cached) {
      let url = `${BaseConfig.baseApiUrl}/films/${id}?format=json`;

      try {
        let res = (await fetch(url)) as any;
        
        const movie = MovieSerializer.toMovie(res);

        const people = [];

        for (const characterUrl of movie.characters) {
          people.push(await this.characterDao.getCharacter(characterUrl));
        }

        movie.characters = people.map((x: any) => x.name);

        await this.redis.set(`Movie-${id}`, JSON.stringify(movie));

        return movie;
      } catch {
        return null;
      }
    }

    return JSON.parse(cached);
  }
}
