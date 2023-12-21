import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
   userId?: Types.ObjectId;
}

export type TokenType = {
   id: Types.ObjectId;
   role: string;
};
