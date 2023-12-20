import { validationResult } from "express-validator";
import Profile from "../models/Profile.model.js";

class ProfileController {
   async getMyProfiles(req, res) {
      try {
         const profile = await Profile.find({ user: req.userId });

         return res.json(profile);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async getUserProfiles(req, res) {
      try {
         const profile = await Profile.find({ user: req.params.id });

         return res.json(profile);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async createProfile(req, res) {
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
   async updateUserProfile(req, res) {
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
   async updateMyProfiles(req, res) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
         }

         const profile = await Profile.findById(req.params.id);
         if (req.userId != profile.user) {
            return res.status(400).json({ message: "you can't update someone profile" });
         }
         await profile.updateOne(req.body);
         return res.json({ message: "success" });
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new ProfileController();
