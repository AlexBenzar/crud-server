import { check } from "express-validator";
import { ErrorMessages } from "../config";

export const signUpValidator = [
   check("email", ErrorMessages.EmailError).isEmail(),
   check("password", ErrorMessages.PasswordError).isLength({
      min: 4,
      max: 15,
   }),
   check("username", ErrorMessages.UserNameError).notEmpty(),
   check("picture", ErrorMessages.PictureError).optional().isURL(),
];

export const signInValidator = [
   check("username", ErrorMessages.UserNameError).notEmpty(),
   check("password", ErrorMessages.PasswordError).isLength({
      min: 4,
      max: 15,
   }),
];

export const updateUserValidator = [
   check("email", ErrorMessages.EmailError).optional().isEmail(),
   check("password", ErrorMessages.PasswordError).optional().isLength({
      min: 4,
      max: 15,
   }),
   check("username", ErrorMessages.UserNameError).optional().notEmpty(),
   check("picture", ErrorMessages.PictureError).optional().isURL(),
];

export const profileValidator = [
   check("photo", ErrorMessages.PictureError).optional().isURL(),
   check("full_name", ErrorMessages.UserNameError).notEmpty(),
   check("birthdate", ErrorMessages.BirthdateError).isDate(),
   check("city", ErrorMessages.CityError).notEmpty(),
];

export const updateProfileValidator = [
   check("photo", ErrorMessages.PictureError).optional().isURL(),
   check("full_name", ErrorMessages.UserNameError).optional().notEmpty(),
   check("birthdate", ErrorMessages.BirthdateError).optional().isDate(),
   check("city", ErrorMessages.CityError).optional().notEmpty(),
];
