import { check } from 'express-validator';

const signUpValidator = [
  check('email', "email isn't correct").isEmail(),
  check('password', "password can't me less than 4 and more than 15 symbol").isLength({
    min: 4,
    max: 15,
  }),
  check('username', "username can't be empty").notEmpty(),
  check('picture', 'make sure you have entered the link correctly').optional().isURL(),
];

export default signUpValidator;
