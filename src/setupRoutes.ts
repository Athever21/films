import { Express, Router } from "express";
import { MovieService } from "@/movies/service";
import redis from "@/redis";
import { MovieDao } from "./movies/dao";
import autoCatch from "@/errors/autoCatch";
import { PrismaClient } from "@prisma/client";
import { FavoriteDao } from "@/favorites/dao";
import { FavoriteService } from "@/favorites/services";
import { BaseConfig } from "@/config/base.config";
import { FavoriteRouter } from "@/favorites/router";
import { CharactersDao } from "@/characters/dao";
import { MovieRouter } from "@/movies/router";

export default (app: Express) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: BaseConfig.dbUrl,
      },
    },
  });

  const charactersDao = new CharactersDao(redis);
  const movieDao = new MovieDao(redis, charactersDao);
  const movieService = new MovieService(movieDao);
  const movieRoutes = new MovieRouter(movieService);

  const moviesRouter = Router();

  moviesRouter
    .route("/")
    .get(autoCatch(movieRoutes.getAllMovies.bind(movieRoutes)));

  app.use("/movies", moviesRouter);

  const favoriteDao = new FavoriteDao(prisma);
  const favoriteService = new FavoriteService(favoriteDao, movieService);
  const favoriteRoutes = new FavoriteRouter(favoriteService);

  const favoriteRouter = Router();

  favoriteRouter
    .route("/")
    .get(autoCatch(favoriteRoutes.getAllLists.bind(favoriteRoutes)))
    .post(autoCatch(favoriteRoutes.createList.bind(favoriteRoutes)));

  favoriteRouter
    .route("/:id")
    .get(autoCatch(favoriteRoutes.getList.bind(favoriteRoutes)));

  favoriteRouter
    .route("/:id/file")
    .get(autoCatch(favoriteRoutes.getListExcel.bind(favoriteRoutes)));

  app.use("/favorites", favoriteRouter);
};
