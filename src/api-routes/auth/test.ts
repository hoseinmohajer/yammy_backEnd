// import * as express from "express";
// import { Response, Request, Router } from "express";
// const expect = require("chai").expect;
//
// let app = express();

// describe("Register method (Async)", () => {
//   describe("Status 400", () => {
//     it("Return Status 400", (done) => {
//       app.post("/register", (req: Request, res: Response) => {
//         expect(res.statusCode).to.equal(400);
//       });
//       done();
//     });
//   });
//
//   describe("Checking the email address", () => {
//     it("Email is already exist (status 400)", (done) => {
//       const data = {
//         username: "hoseinmohajer",
//         email: "hosein.mohajer@gmail.com",
//         password: 123456,
//       };
//       app.post("/register", (req: Request, res: Response) => {
//         expect(res.statusCode).to.equal(400);
//       });
//       done();
//     });
//   });
//
//   describe("Register successfully", () => {
//     it("Your account registered successfully.", (done) => {
//       const data = {
//         username: "jhon duo",
//         email: "test@mail.com",
//         password: 123456,
//       };
//       app.post("/register", (req: Request, res: Response) => {
//         expect(res.statusCode).to.equal(200);
//       });
//       done();
//     });
//   });
// });
