import { Document, Model, model, Schema } from "mongoose";
import { IApiKey } from "./APIKeys";
/**
 * Interface to model the Log Schema for TypeScript.
 * @param apiKeyID:ref => ApiKey._id
 * @param url:string
 */
export interface ILog extends Document {
  apiKeyID: IApiKey["_id"];
  url: string;
  _id: string;
}

const logSchema: Schema = new Schema(
  {
    apiKeyID: {
      type: Schema.Types.ObjectId,
      ref: "ApiKey",
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Log = model<ILog>("Log", logSchema);

export default Log;
