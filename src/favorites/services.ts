import { CreateList } from "./dto/createList";
import { FavoriteDao } from "./dao";
import { HttpError } from "@/errors/HttpError";
import { MovieService } from "@/movies/service";

export class FavoriteService {
  constructor(
    private readonly dao: FavoriteDao,
    private readonly movieService: MovieService
  ) {}

  async getAll(name: string, page: number) {
    return await this.dao.getAllLists(page, name);
  }

  async createList(list: CreateList) {
    for (const movieId of list.movies) {
      const movie = await this.movieService.getMovie(movieId);

      if (!movie) {
        throw new HttpError(400, `Movie id ${movieId} doesn't exists`);
      }
    }

    return await this.dao.createList(list);
  }

  async getList(id: string) {
    const list = await this.dao.getList(id);

    if (!list) {
      throw new HttpError(400, "List not found");
    }

    const movies = [];

    for (const movieId of list.movies) {
      movies.push(await this.movieService.getMovie(movieId));
    }

    list.movies = movies;

    return list;
  }
}
