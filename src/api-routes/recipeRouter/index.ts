import * as express from "express";
import { Response, Request, Router } from "express";
import Recipe from "../../models/Recipe";
import verify from "../verifyToken";

const recipeRouter: Router = express.Router();

// Gets back all the posts

recipeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);

    // following code is because of jwt id and we can find the specific user with the id.
    // const posts = await Recipe.findOne({ _id: req.user._id });
    // res.json(posts);
    // res.json(req.user);
  } catch (error) {
    res.json({ message: error });
  }
});

// Submit recipe
recipeRouter.post("/", async (req: Request, res: Response) => {
  const post = new Recipe({
    title: req.body.title,
    description: req.body.description,
    servings: req.body.servings,
    cookingTime: req.body.cookingTime,
  });
  try {
    const savedPost = await post.save();
    res.json({ data: [savedPost], message: "Your post created successfully." });
  } catch (err) {
    res.json({ message: `something went wrong ${err}` });
  }
});

// Get specific post
recipeRouter.get("/:recipeId", async (req: Request, res: Response) => {
  try {
    const post = await Recipe.findById(req.params.recipeId);
    if (!post)
      return res
        .status(404)
        .send(`The post with ${req.params.id} id doesnt exist!`);
    res.json(post);
  } catch (err) {
    res.status(404).send(`The post with this id doesnt exist!`);
    // res.status(404).json({ message: `There is an error ${err}` });
  }
});

// Delete specific post
recipeRouter.delete("/:recipeId", async (req: Request, res: Response) => {
  try {
    const deletedPost = await Recipe.remove({ _id: req.params.recipeId });
    res.json(deletedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// update specific post
recipeRouter.patch("/:recipeId", async (req: Request, res: Response) => {
  try {
    const updatedPost = await Recipe.updateOne(
      { _id: req.params.recipeId },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

export default recipeRouter;
