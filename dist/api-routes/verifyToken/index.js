"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const env = require("../../constants/env");
const SECRET_KEY = env.TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).send("Unauthorized!");
    try {
        req.body.user = jwt.verify(token, SECRET_KEY);
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
exports.default = verifyToken;
//# sourceMappingURL=index.js.map