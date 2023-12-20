import jwt from "jsonwebtoken";
import { secret } from "../config.js";

export default (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
         return res.status(403).json({ message: "you don't have an account. Please create one" });
      }
      const decodedToken = jwt.verify(token, secret);

      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "you don't have an account. Please create one" });
   }
};
