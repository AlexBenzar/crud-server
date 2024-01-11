import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
   userId?: Types.ObjectId;
}

export interface UserBody {
   username: string;
   password: string;
   email: string;
   role: string;
}
