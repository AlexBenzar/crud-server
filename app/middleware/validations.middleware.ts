import { check } from "express-validator";
import { ErrorMessages } from "../config";

export const signUpValidator = [
   check("email", ErrorMessages.EmailError).isEmail(),
   check("password", ErrorMessages.PasswordError).isLength({
      min: 4,
      max: 15,
   }),
   check("username", ErrorMessages.UserNameError).notEmpty(),
   check("picture", ErrorMessages.PictureError).optional(),
];

export const signInValidator = [
   check("email", ErrorMessages.EmailError).isEmail(),
   check("password", ErrorMessages.PasswordError).isLength({
      min: 4,
      max: 15,
   }),
];

export const updateUserValidator = [
   check("email", ErrorMessages.EmailError).optional().isEmail(),
   check("username", ErrorMessages.UserNameError).optional().notEmpty(),
   check("picture", ErrorMessages.PictureError).optional().isURL(),
];

export const profileValidator = [
   check("photo", ErrorMessages.PictureError).optional().isURL(),
   check("full_name", ErrorMessages.UserNameError).notEmpty(),
   check("birthdate", ErrorMessages.BirthdateError).isDate(),
   check("city", ErrorMessages.CityError).notEmpty(),
   check("country", ErrorMessages.CityError).notEmpty(),
];
