import getIdFromUrl from "@/utils/getIdFromUrl";
import { Movie } from "./interaces";

export class MovieSerializer {
  public static toAllMovies(movie: Movie) {
    return {
      id: getIdFromUrl(movie.url),
      title: movie.title,
      release_date: movie.release_date,
    };
  }

  public static toMovie(movie: Movie) {
    return {
      id: getIdFromUrl(movie.url),
      title: movie.title,
      release_date: movie.release_date,
      characters: movie.characters,
    };
  }
}
