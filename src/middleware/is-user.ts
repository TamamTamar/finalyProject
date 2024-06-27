/* import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

const _isUser: RequestHandler = (req, res, next) => {
  const { isUser } = req.payload;

  if (isUser) {
    return next();
  }

  next(new BizCardsError(403, "Must be a user"));
};

//export an array of middleware
export const isBusiness = [validateToken, _isUser]; */