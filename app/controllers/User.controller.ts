import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User.model";
import Profile from "../models/Profile.model";
import Role from "../models/Role.model";
import { isAdult, secret } from "../config";
import savePicture from "../helpers/file.helper";
import { CustomRequest, UserBody } from "../types";

class UserController {
   async getAll(req: Request, res: Response) {
      try {
         const users = await User.find();
         return res.json(users);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async getDashboard(req: CustomRequest, res: Response) {
      try {
         const sumOfUsers = await User.find().countDocuments();
         const sumOfProfiles = await Profile.find().countDocuments();
         const sumOfProfilesOlderThen18 = await Profile.find(isAdult).countDocuments();
         return res.json({ sumOfUsers, sumOfProfiles, sumOfProfilesOlderThen18 });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async getUser(req: CustomRequest, res: Response) {
      try {
         const owner = await User.findById(req.userId);
         const { id } = req.params;
         if (id) {
            if (owner?.role !== "admin") {
               return res.status(403).json({ message: "You don't have permission" });
            }
            const user = await User.findById(id);
            return res.json(user);
         }
         return res.json(owner);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async editUser(req: Request, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }
         const { id } = req.params;
         const body = req.body;

         const user = await User.findById(id);
         const duplicate = await User.findOne({ email: body.email });
         if (duplicate && duplicate.email !== user?.email) {
            return res.status(400).json({ message: "This email already exists" });
         }

         let picture = null;
         if (req.file) {
            picture = await savePicture(req.file);
            body.picture = picture;
         }
         await User.findByIdAndUpdate(id, body, { new: true });
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async deleteUser(req: Request, res: Response) {
      try {
         await User.findByIdAndDelete(req.params.id);
         const profiles = await Profile.find({ user: req.params.id });
         profiles.map(async (prof) => await prof.deleteOne());
         return res.json({ message: "success" });
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
         const { username, password, email, role }: UserBody = req.body;
         const isNew = await User.findOne({ email });

         if (isNew) {
            return res.status(400).json({ message: "User with this email already exists" });
         }

         let picture = null;
         if (req.file) {
            picture = await savePicture(req.file);
         }
         const hashPassword = bcrypt.hashSync(password, 5);
         const userRole = await Role.findOne({ value: role });

         await User.create({
            username,
            email,
            password: hashPassword,
            role: userRole?.value ?? "user",
            picture,
         });

         const user = await User.findOne({ email });

         if (!user) {
            return res.status(500).json({ message: "something went wrong :(" });
         }

         const token = jwt.sign({ id: user._id, role: user.role }, secret, {
            expiresIn: "24h",
         });
         return res.status(200).json({ token, role: user.role });
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
         const { email, password } = req.body;
         const user = await User.findOne({ email });

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
         return res.status(200).json({ token, role: user.role });
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new UserController();
