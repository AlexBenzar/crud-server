import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secret } from "../config";

export default (role: string) => (req: Request, res: Response, next: NextFunction) => {
   try {
      if (!req.headers.authorization) {
         return res.status(403).json({ message: "you don't have an account. Please create one" });
      }
      const token: string = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, secret) as JwtPayload;
      if (decodedToken.role != role) {
         return res.status(403).json({ message: "you don't have access to do it" });
      }
      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "you don't have an account. Please create one" });
   }
};
