import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  servings: {
    type: String,
  },
  cookingTime: {
    type: Number,
  },
});

export default model("Recipe", RecipeSchema);
