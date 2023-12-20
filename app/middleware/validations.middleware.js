import { check } from "express-validator";

export const signUpValidator = [
   check("email", "email isn't correct").isEmail(),
   check("password", "password can't me less than 4 and more than 15 symbol").isLength({
      min: 4,
      max: 15,
   }),
   check("username", "username can't be empty").notEmpty(),
   check("picture", "make sure you have entered the link correctly").optional().isURL(),
];

export const signInValidator = [
   check("username", "username can't be empty").notEmpty(),
   check("password", "password can't me less than 4 and more than 15 symbol").isLength({
      min: 4,
      max: 15,
   }),
];

export const updateUserValidator = [
   check("email", "email isn't correct").optional().isEmail(),
   check("password", "password can't me less than 4 and more than 15 symbol").optional().isLength({
      min: 4,
      max: 15,
   }),
   check("username", "username can't be empty").optional().notEmpty(),
   check("picture", "make sure you have entered the link correctly").optional().isURL(),
];

export const profileValidator = [
   check("photo", "make sure you have entered the link correctly").optional().isURL(),
   check("full_name", "full name can't be empty").notEmpty(),
   check("birthdate", "choose your birthdate").isDate(),
   check("city", "you forgot to choose your city").notEmpty(),
];

export const updateProfileValidator = [
   check("photo", "make sure you have entered the link correctly").optional().isURL(),
   check("full_name", "full name can't be empty").optional().notEmpty(),
   check("birthdate", "choose your birthdate").optional().isDate(),
   check("city", "you forgot to choose your city").optional().notEmpty(),
];
