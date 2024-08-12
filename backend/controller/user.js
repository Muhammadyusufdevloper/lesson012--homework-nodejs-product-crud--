import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users, validateUser } from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

function requiredCatch() {
  return {
    msg: "Server error",
    variant: "error",
    payload: null
  };
}

function informationReturn(msg, variant, payload) {
  return {
    msg,
    variant,
    payload
  };
}

class UsersController {
  async registerUser(req, res) {
    try {
      const { error } = validateUser(req.body);
      if (error)
        return res.status(400).json(informationReturn(error.details[0].message, "error", null));

      const { username, password } = req.body;

      const existingUser = await Users.findOne({ username });
      if (existingUser)
        return res.status(400).json(informationReturn("User already exists.", "error", null));

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json(informationReturn("User registered successfully", "success", user));
    } catch (err) {
      res.status(500).json(requiredCatch());
    }
  }
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({ username });
      if (!user)
        return res.status(400).json(informationReturn("Invalid username or password.", "error", null));

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json(informationReturn("Invalid username or password.", "error", null));

      const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json(informationReturn("Logged in successfully", "success", token));
    } catch (err) {
      res.status(500).json(requiredCatch());
    }
  }
  async getProfile(req, res) {
    try {
      let user = await Users.findById(req.user._id);
      res.status(200).json(informationReturn("User profile fetched successfully", "success", user));
    } catch (err) {
      res.status(500).json(requiredCatch());
    }
  }
}

export default new UsersController();