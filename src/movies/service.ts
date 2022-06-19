import { MovieDao } from "./dao";

export class MovieService {
  constructor (private readonly dao: MovieDao) {}

  async getAllMovies() {
    const movies = await this.dao.getAllMovies();
    return movies;
  }

  async getMovie(id: number) {
    const movie = await this.dao.getMovie(id);
    return movie;
  }
}