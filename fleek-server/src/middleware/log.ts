import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";

import Request from "../types/Request";
import Log, { ILog } from "../models/Logs";
import ApiKey, { IApiKey } from "../models/APIKeys";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get token from header
  const token = req.header("x-api-token");

  // Verify token
  try {
    let apiKey = await ApiKey.findOne({ token });
    const logs = {
      apiKeyID: apiKey._id,
      url: req.url,
    };

    let log = new Log(logs);

    await log.save();

    next();
  } catch (err) {
    console.log(err);
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: "Key is not valid" });
  }
}
