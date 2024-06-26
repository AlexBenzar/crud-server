import { Response } from "express";
import { validationResult } from "express-validator";
import Profile from "../models/Profile.model";
import User from "../models/User.model";
import { CustomRequest } from "../types/index";
import savePicture from "../helpers/file.helper";
import { isAdult } from "../config";

class ProfileController {
   async getProfiles(req: CustomRequest, res: Response) {
      try {
         const search = (req.query.search as string) || "";
         const order = (req.query.order as string) || "city";
         const owner = await User.findById(req.userId);
         const { id } = req.params;
         let sortOption = {};
         if (order === "birthdate") {
            sortOption = isAdult;
         }
         const profile = await Profile.find({
            $and: [{ user: id || owner?._id }, { full_name: { $regex: new RegExp(search, "i") } }, sortOption],
         }).sort([[`${order}`, 1]]);
         if (id) {
            if (owner?.role !== "admin") {
               return res.status(403).json({ message: "You don't have permission" });
            }
            return res.json(profile);
         }
         return res.json(profile);
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async getProfilesCount(req: CustomRequest, res: Response) {
      try {
         const sumOfProfiles = await Profile.find({ user: req.params.id }).countDocuments();
         return res.json(sumOfProfiles);
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
            if (owner?.role !== "admin") {
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
         if (owner?._id.toString() === profiles?.user.toString() || owner?.role === "admin") {
            await Profile.findByIdAndDelete(req.params.id);
            return res.json({ message: "success" });
         } else {
            return res.status(403).json({ message: "You don't have permission" });
         }
      } catch (error) {
         res.status(500).json(error);
      }
   }
   async updateProfile(req: CustomRequest, res: Response) {
      try {
         const owner = await User.findById(req.userId);
         const profiles = await Profile.findById(req.params.id);
         const body = req.body;
         let photo = null;
         if (req.file) {
            photo = await savePicture(req.file);
            body.photo = photo;
         }
         if (owner?._id.toString() === profiles?.user.toString() || owner?.role === "admin") {
            await Profile.findByIdAndUpdate(req.params.id, body, { new: true });
            return res.json({ message: "success" });
         } else {
            return res.status(403).json({ message: "You don't have permission" });
         }
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new ProfileController();
