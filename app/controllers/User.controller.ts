import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User.model";
import Role from "../models/Role.model";
import { secret } from "../config";
import savePicture from "../helpers/file.helper";

class UserController {
   async getAll(req: Request, res: Response) {
      try {
         const user = await User.find();

         return res.json(user);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async signUp(req: Request, res: Response) {
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

         let picture = null;
         if (req.file) {
            picture = await savePicture(req.file);
         }

         const hashPassword = bcrypt.hashSync(password, 5);
         const userRole = await Role.findOne({ value: isAdmin ? "admin" : "user" });

         await User.create({
            username,
            email,
            password: hashPassword,
            role: userRole?.value,
            picture,
         });

         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async signIn(req: Request, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }
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
