import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ErrorMessages, secret } from "../config";
import { CustomRequest } from "../types";

export default (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      if (!req.headers.authorization) {
         return res.status(403).json({ message: ErrorMessages.AccounNotFound });
      }
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, secret) as JwtPayload;
      req.userId = decodedToken.id;
      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: ErrorMessages.AccounNotFound });
   }
};
