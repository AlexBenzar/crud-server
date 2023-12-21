import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secret, ErrorMessages } from "../config";

export default (role: string) => (req: Request, res: Response, next: NextFunction) => {
   try {
      if (!req.headers.authorization) {
         return res.status(403).json({ message: ErrorMessages.AccounNotFound });
      }
      const token: string = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, secret) as JwtPayload;
      if (decodedToken.role != role) {
         return res.status(403).json({ message: ErrorMessages.PermissionError });
      }
      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: ErrorMessages.AccounNotFound });
   }
};
