import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const env = require("../../constants/env");
const SECRET_KEY = env.TOKEN_SECRET;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Unauthorized!");

  try {
    req.body.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default verifyToken;
