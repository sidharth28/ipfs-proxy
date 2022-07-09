import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import uuidAPIKey from "uuid-apikey";
import Request from "../../types/Request";
import ApiKey, { IApiKey } from "../../models/APIKeys";
import Log, { ILog } from "../../models/Logs";

const router: Router = Router();
import auth from "../../middleware/auth";

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    let keys = await ApiKey.find({ user: userId });
    let logs: any = {};
    for (let k of keys) {
      logs[k.token] = await Log.find({ apiKeyID: k._id });
    }
    res.json({ keys, logs });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/logs/:key", auth, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    let apiKey = await ApiKey.findOne({ token: req.params.key });
    let logs = await Log.find({ apiKeyID: apiKey._id });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post("/:key", auth, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    console.log(req.params.key);
    let apiKeyObj = await ApiKey.findOne({
      token: req.params.key,
      user: userId,
    });
    let apiKey = await ApiKey.updateOne(
      { token: req.params.key, user: userId },
      [{ $set: { isActive: !apiKeyObj.isActive } }]
    );
    res.json({});
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.put("/", auth, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    let apikeyObj = {
      user: userId,
      token: uuidAPIKey.create()["apiKey"],
      isActive: true,
    };

    let apikey = new ApiKey(apikeyObj);

    await apikey.save();

    res.json({ success: true, message: "ApI key created" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
