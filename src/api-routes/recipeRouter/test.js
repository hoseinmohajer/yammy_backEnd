const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");

// Assertion style
chai.should();
chai.use(chaiHttp);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3NGVlMDM3NzliYzE5OGU2MGQ1N2UiLCJpYXQiOjE2MjQwODIxMzV9.2zlWvQmFJ6XTC1cd4KzZEhMX0DWk6hz8elkCGzh3xVk";

describe("Recipe API", () => {
  /**
   * Test the GET route
   * */
  describe("GET /api/recipe", () => {
    it("I should get all the recipes", async () => {
      const res = await chai
        .request(server)
        .get("/api/recipe")
        .set({ Authorization: `Bearer ${token}` });
      res.status.should.be.equal(200);
      res.body.should.be.a("array");
    });
    it("I should not get all the recipes", async () => {
      const res = await chai
        .request(server)
        .get("/api/recipes")
        .set("Authorization", `${token}`);
      res.status.should.be.equal(404);
    });
  });
  /**
   * Test the GET (by id) route
   * */
  describe("GET (by id) /api/recipe/:id", () => {
    it("I should get by id a recipe", async () => {
      const res = await chai
        .request(server)
        .get(`/api/recipe/60c74f923779bc198e60d580`)
        .set("Authorization", `${token}`);
      res.status.should.be.equal(200);
      res.body.should.be.a("object");
      res.body.should.have.property("_id");
      res.body.should.have.property("title");
      res.body.should.have.property("description");
      res.body.should.have.property("servings");
      res.body.should.have.property("_id").equal("60c74f923779bc198e60d580");
    });
    it("I should NOT get by id a recipe", async () => {
      const res = await chai
        .request(server)
        .get(`/api/recipe/60c74f923779bc198e60d580000`)
        .set("Authorization", `${token}`);
      res.status.should.be.equal(404);
      res.text.should.equal("The post with this id doesnt exist!");
    });
  });
  /**
   * Test the POST route
   * */
  describe("POST new recipe /api/recipe", () => {
    it("I should create a new recipe on database", async () => {
      const postData = {
        title: "test title from TEST",
        description: "test description from TEST",
        servings: "test serving number 123 from TEST",
        cookingTime: 60,
      };
      const res = await chai
        .request(server)
        .post(`/api/recipe`)
        .send(postData)
        .set("Authorization", `${token}`);
      res.status.should.be.equal(200);
      res.body.should.be.a("object");
      const id = res.body.data[0]._id;
      res.body.should.deep.have.property("data").equal([
        {
          _id: id,
          title: "test title from TEST",
          description: "test description from TEST",
          servings: "test serving number 123 from TEST",
          cookingTime: 60,
          __v: 0,
        },
      ]);
      res.body.should.have
        .property("message")
        .equal("Your post created successfully.");
    });
  });
});
