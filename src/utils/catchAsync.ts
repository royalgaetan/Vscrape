import { NextFunction, Request, Response } from "express";

type asyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync =
  (controller: asyncController): asyncController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      next(e);
    }
  };

export default catchAsync;
