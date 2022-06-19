import { Request, Response } from "express";
import { MovieService } from "./service";

export class MovieRouter {
  constructor(private readonly service: MovieService) {}

  async getAllMovies(_: Request, res: Response) {
    const movies = await this.service.getAllMovies();
    return res.json(movies);
  }
}
