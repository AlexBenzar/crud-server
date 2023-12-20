import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.model.js";
import Role from "../models/Role.model.js";
import { secret } from "../config.js";

class UserController {
   async getAll(req, res) {
      try {
         const user = await User.find();

         return res.json(user);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async signUp(req, res) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }
         const { username, password, email, isAdmin = false } = req.body;
         const isNew = await User.findOne({ username });

         if (isNew) {
            return res.status(400).json({ message: "User with this name already exists" });
         }

         const hashPassword = bcrypt.hashSync(password, 5);
         const userRole = await Role.findOne({ value: isAdmin ? "admin" : "user" });

         await User.create({
            username,
            email,
            password: hashPassword,
            role: userRole.value,
         });

         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async signIn(req, res) {
      try {
<<<<<<< HEAD
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }
=======
>>>>>>> 9c4e3c4bce8cd8a32cf451a688fcb81a18e5949a
         const { username, password } = req.body;
         const user = await User.findOne({ username });

         if (!user) {
            return res.status(400).json({ message: "user not found" });
         }

         const isValidPas = bcrypt.compareSync(password, user.password);
         if (!isValidPas) {
            return res.status(400).json({ message: "password isn't correct" });
         }
         const token = jwt.sign({ id: user._id, role: user.role }, secret, {
            expiresIn: "24h",
         });
         return res.json({ token });
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new UserController();
