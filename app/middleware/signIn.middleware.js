import jwt from "jsonwebtoken";
import { secret } from "../config";

export default (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
         return res.status(403).json({ message: "create account" });
      }
      const decodedToken = jwt.verify(token, secret);

      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "create account" });
   }
};
