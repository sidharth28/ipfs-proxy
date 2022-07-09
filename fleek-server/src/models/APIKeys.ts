import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./User";
/**
 * Interface to model the ApiKey Schema for TypeScript.
 * @param user:ref => User._id
 * @param token:string
 * @param isActive:boolean
 */
export interface IApiKey extends Document {
  user: IUser["_id"];
  token: string;
  isActive: boolean;
}

const apiKeySchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const ApiKey = model<IApiKey>("ApiKey", apiKeySchema);

export default ApiKey;
