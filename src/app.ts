import * as express from "express";
import { Request, Response, Application } from "express";
import { connect } from "mongoose";
import * as bodyParser from "body-parser";
const cors = require("cors");
import recipeRouter from "./api-routes/recipeRouter";
import categoryRouter from "./api-routes/categoryRouter";
import authRouter from "./api-routes/auth";
import { PORT, DB_CONNECTION } from "./constants/env";
const path = require('path');


let app: Application = express();
app.use(bodyParser.json());
const server = app.listen(PORT || 3000);
const uri: string = DB_CONNECTION;

connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected: ", uri);
  })
  .catch((err) => {
    console.log("connection error:", err);
  });
//Middlewares
app.use(cors());
app.use("/assets",express.static('assets'));
app.use("/api/recipe", recipeRouter);
app.use("/api/category", categoryRouter);
app.use("/api/auth", authRouter);
// app.get("*", function (req: Request, res: Response) {
//   res.status(404).send("NotFound!");
// });

module.exports = server;
