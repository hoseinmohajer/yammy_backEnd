import * as express from "express";
import { Response, Request, Router } from "express";
import { Document } from "mongoose";
import User from "../../models/User";
import { registerValidation, loginValidation } from "../../validation";
import { TOKEN_SECRET } from "../../constants/env";
import * as jwt from "jsonwebtoken";
const { sign } = jwt;
const bcrypt = require("bcryptjs");

const authRouter: Router = express.Router();

interface USER extends Document {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  username?: string;
  email: string;
  password: string;
  date: Date;
}

// Register
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    //validate enter data before we make a user.
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user is being already in the database
    const existEmail: USER = (await User.findOne({
      email: req.body.email,
    })) as USER;
    if (existEmail) return res.status(400).send({message: "Email already exist!"});

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      date: req.body.date,
      address: req.body.address
    });
    const savedUser = await user.save();
    const token = sign({ _id: user._id }, TOKEN_SECRET);
    res.header("Authorization", token).send({ token, user: savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    //validate enter data before we make a user.
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the email exist
    const user: USER = (await User.findOne({
      email: req.body.email,
    })) as USER;
    if (!user) return res.status(400).send("Email is not found!");

    // Password is correct
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    // Create and assign a token
    const token = sign({ _id: user._id }, TOKEN_SECRET);
    res.header("Authorization", token).send({ token, user });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default authRouter;
