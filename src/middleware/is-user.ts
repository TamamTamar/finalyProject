import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";


const _isUser: RequestHandler = (req, _, next) => {
    if (req.payload?.isBusiness) {
        return next();
    }

    next(new BizProductsError(403, "Must be user"));
};

export const isUser = [validateToken, _isUser];