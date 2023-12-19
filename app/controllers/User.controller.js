import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.model.js';
import Role from '../models/Role.model.js';

class UserController {
  async getAll(req, res) {
    try {
      const user = await User.find();

      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async signUp(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
      }
      const { username, password, email } = req.body;
      const isNew = await User.findOne({ username });

      if (isNew) {
        return res.status(400).json({ message: 'User with this name already exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: 'user' });

      await User.create({
        username,
        email,
        password: hashPassword,
        role: userRole.value,
      });

      return res.json({ message: 'success' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async signIn(req, res) {
    try {
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
