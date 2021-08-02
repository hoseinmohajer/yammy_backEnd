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
const Recipe_1 = require("../../models/Recipe");
const recipeRouter = express.Router();
// Gets back all the posts
recipeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield Recipe_1.default.find();
        res.json(recipes);
        // following code is because of jwt id and we can find the specific user with the id.
        // const posts = await Recipe.findOne({ _id: req.user._id });
        // res.json(posts);
        // res.json(req.user);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// Submit recipe
recipeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Recipe_1.default({
        title: req.body.title,
        description: req.body.description,
        servings: req.body.servings,
        cookingTime: req.body.cookingTime,
    });
    try {
        const savedPost = yield post.save();
        res.json({ data: [savedPost], message: "Your post created successfully." });
    }
    catch (err) {
        res.json({ message: `something went wrong ${err}` });
    }
}));
// Get specific post
recipeRouter.get("/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Recipe_1.default.findById(req.params.recipeId);
        if (!post)
            return res
                .status(404)
                .send(`The post with ${req.params.id} id doesnt exist!`);
        res.json(post);
    }
    catch (err) {
        res.status(404).send(`The post with this id doesnt exist!`);
        // res.status(404).json({ message: `There is an error ${err}` });
    }
}));
// Delete specific post
recipeRouter.delete("/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield Recipe_1.default.remove({ _id: req.params.recipeId });
        res.json(deletedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
// update specific post
recipeRouter.patch("/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield Recipe_1.default.updateOne({ _id: req.params.recipeId }, {
            $set: {
                title: req.body.title,
            },
        });
        res.json(updatedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.default = recipeRouter;
//# sourceMappingURL=index.js.map