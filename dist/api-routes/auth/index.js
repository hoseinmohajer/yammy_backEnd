"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const User_1 = require("../../models/User");
const validation_1 = require("../../validation");
const env_1 = require("../../constants/env");
const jwt = require("jsonwebtoken");
const { sign } = jwt;
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
// Register
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        //validate enter data before we make a user.
        const { error } = validation_1.registerValidation(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        // checking if the user is being already in the database
        const existEmail = (yield User_1.default.findOne({
            email: req.body.email,
        }));
        if (existEmail)
            return res.status(400).send({ message: "Email already exist!" });
        // Hashing the password
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(req.body.password, salt);
        // create a new user
        const user = new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            date: req.body.date,
            address: req.body.address
        });
        const savedUser = yield user.save();
        const token = sign({ _id: user._id }, env_1.TOKEN_SECRET);
        res.header("Authorization", token).send({ token, user: savedUser });
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// Login
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate enter data before we make a user.
        const { error } = validation_1.loginValidation(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        // check if the email exist
        const user = (yield User_1.default.findOne({
            email: req.body.email,
        }));
        if (!user)
            return res.status(400).send("Email is not found!");
        // Password is correct
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const validPassword = yield bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid password");
        // Create and assign a token
        const token = sign({ _id: user._id }, env_1.TOKEN_SECRET);
        res.header("Authorization", token).send({ token, user });
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = authRouter;
//# sourceMappingURL=index.js.map