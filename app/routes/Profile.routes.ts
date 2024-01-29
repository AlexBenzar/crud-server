import { Router } from "express";
import ProfileController from "../controllers/Profile.controller";
import { profileValidator } from "../middleware/validations.middleware";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/uploar.middleware";

const profileRouter = Router();

profileRouter.get("/profile", authMiddleware, ProfileController.getProfiles);
profileRouter.get("/profile/:id", authMiddleware, ProfileController.getProfiles);
profileRouter.get("/profile_count/:id", authMiddleware, ProfileController.getProfilesCount);
profileRouter.post("/profile", upload.single("photo"), authMiddleware, profileValidator, ProfileController.createProfile);
profileRouter.post("/profile/:id", upload.single("photo"), authMiddleware, profileValidator, ProfileController.createProfile);
profileRouter.delete("/profile/:id", authMiddleware, ProfileController.deleteProfile);
profileRouter.patch("/profile/:id", upload.single("photo"), authMiddleware, profileValidator, ProfileController.updateProfile);

export default profileRouter;
