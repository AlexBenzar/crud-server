import jwt from "jsonwebtoken";
<<<<<<< HEAD
import { secret } from "../config.js";
=======
import { secret } from "../config";
>>>>>>> 9c4e3c4bce8cd8a32cf451a688fcb81a18e5949a

export default (role) => (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
         return res.status(403).json({ message: "you don't have an account. Please create one" });
      }
      const decodedToken = jwt.verify(token, secret);
      if (decodedToken.role != role) {
         return res.status(403).json({ message: "you don't have access to do it" });
      }
      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "you don't have an account. Please create one" });
   }
};
