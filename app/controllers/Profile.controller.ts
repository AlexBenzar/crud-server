import { Response } from "express";
import { validationResult } from "express-validator";
import Profile from "../models/Profile.model";
import User from "../models/User.model";
import { CustomRequest } from "../types/index";
import savePicture from "../helpers/file.helper";

class ProfileController {
   async getProfiles(req: CustomRequest, res: Response) {
      try {
         const owner = await User.findById(req.userId);
         const { id } = req.params;
         if (id) {
            if (owner?.role != "admin") {
               return res.status(403).json({ message: "You don't have permission" });
            }
            const profile = await Profile.find({ user: id });
            return res.json(profile);
         }
         const profile = await Profile.find({ user: owner?._id });
         return res.json(profile);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async createProfile(req: CustomRequest, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }
         const owner = await User.findById(req.userId);
         const { id } = req.params;
         const { full_name, gender = "male", birthdate, city } = req.body;
         let photo = null;
         if (req.file) {
            photo = await savePicture(req.file);
         }
         if (id) {
            if (owner?.role != "admin") {
               return res.status(403).json({ message: "You don't have permission" });
            }
            await Profile.create({ photo, full_name, gender, birthdate: new Date(birthdate), city, user: id });
            return res.json({ message: "success" });
         }
         await Profile.create({ photo, full_name, gender, birthdate: new Date(birthdate), city, user: owner?._id });
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async deleteProfile(req: CustomRequest, res: Response) {
      try {
         const owner = await User.findById(req.userId);
         const profiles = await Profile.findById(req.params.id);
         if (owner?._id.toString() === profiles?.user.toString()) {
            await Profile.findByIdAndDelete(req.params.id);
            return res.json({ message: "success" });
         } else {
            if (owner?.role != "admin") {
               return res.status(403).json({ message: "You don't have permission" });
            }
            await Profile.findByIdAndDelete(req.params.id);
            return res.json({ message: "success" });
         }
      } catch (error) {
         res.status(500).json(error);
      }
   }
   // async updateUserProfile(req: CustomRequest, res: Response) {
   //    try {
   //       const errors = validationResult(req);
   //       if (!errors.isEmpty()) {
   //          return res.status(400).json({ message: errors });
   //       }
   //       await Profile.findByIdAndUpdate(req.params.id, req.body);
   //       return res.json({ message: "success" });
   //    } catch (error) {
   //       res.status(500).json(error);
   //    }
   // }
   // async updateMyProfiles(req: CustomRequest, res: Response) {
   //    try {
   //       const errors = validationResult(req);
   //       if (!errors.isEmpty()) {
   //          return res.status(400).json({ message: errors });
   //       }
   //       const profile = await Profile.findById(req.params.id);
   //       if (!profile) {
   //          return res.status(500).json({ message: "something went wrong" });
   //       }
   //       if (req.userId != profile.user) {
   //          return res.status(400).json({ message: "you can't update someone profile" });
   //       }
   //       await profile.updateOne(req.body);
   //       return res.json({ message: "success" });
   //    } catch (error) {
   //       res.status(500).json(error);
   //    }
   // }
}

export default new ProfileController();
