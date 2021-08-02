"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const recipeRouter_1 = require("./api-routes/recipeRouter");
const categoryRouter_1 = require("./api-routes/categoryRouter");
const auth_1 = require("./api-routes/auth");
const env_1 = require("./constants/env");
const path = require('path');
let app = express();
app.use(bodyParser.json());
const server = app.listen(env_1.PORT || 3000);
const uri = env_1.DB_CONNECTION;
mongoose_1.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Database Connected: ", uri);
})
    .catch((err) => {
    console.log("connection error:", err);
});
//Middlewares
app.use(cors());
app.use("/assets", express.static('assets'));
app.use("/api/recipe", recipeRouter_1.default);
app.use("/api/category", categoryRouter_1.default);
app.use("/api/auth", auth_1.default);
// app.get("*", function (req: Request, res: Response) {
//   res.status(404).send("NotFound!");
// });
module.exports = server;
//# sourceMappingURL=app.js.map