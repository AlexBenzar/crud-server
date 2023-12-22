import { Request } from "express";
import multer from "multer";

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

export default upload;
