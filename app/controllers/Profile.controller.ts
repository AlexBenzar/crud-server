import { Response } from "express";
import { validationResult } from "express-validator";
import Profile from "../models/Profile.model";
import { CustomRequest } from "../types/index";

class ProfileController {
   async getMyProfiles(req: CustomRequest, res: Response) {
      try {
         const profile = await Profile.find({ user: req.userId });

         return res.json(profile);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async getUserProfiles(req: CustomRequest, res: Response) {
      try {
         const profile = await Profile.find({ user: req.params.id });

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
         const { photo, full_name, gender, birthdate, city } = req.body;

         await Profile.create({ photo, full_name, gender, birthdate: new Date(birthdate), city, user: req.userId });

         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async updateUserProfile(req: CustomRequest, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }

         await Profile.findByIdAndUpdate(req.params.id, req.body);
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async updateMyProfiles(req: CustomRequest, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }

         const profile = await Profile.findById(req.params.id);
         if (!profile) {
            return res.status(500).json({ message: "something went wrong" });
         }
         if (req.userId != profile.user) {
            return res.status(400).json({ message: "you can't update someone profile" });
         }
         await profile.updateOne(req.body);
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async deleteUserProfile(req: CustomRequest, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }

         await Profile.findByIdAndDelete(req.params.id);
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async deleteMyProfiles(req: CustomRequest, res: Response) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }

         const profile = await Profile.findById(req.params.id);
         if (!profile) {
            return res.status(500).json({ message: "something went wrong" });
         }
         if (req.userId != profile.user) {
            return res.status(400).json({ message: "you can't delete someone profile" });
         }
         await profile.deleteOne();
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new ProfileController();