import { NextFunction, Response } from "express";
import { HttpError } from "./HttpError";

export default (err: HttpError, _: any, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }

  return res
    .status(err.code || 500)
    .json(err.errors?.length ? { errors: err.errors } : { error: err.message });
};