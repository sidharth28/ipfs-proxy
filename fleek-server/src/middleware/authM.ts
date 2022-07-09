import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";

import Request from "../types/Request";
import ApiKey, { IApiKey } from "../models/APIKeys";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get token from header
  const token = req.header("x-api-token");

  // Check if no token
  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }

  try {
    let apiKey: IApiKey = await ApiKey.findOne({ token, isActive: true });

    if (apiKey) {
      next();
    } else {
      throw "Invalid key";
    }
  } catch (err) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: "Key is not valid" });
  }
}
