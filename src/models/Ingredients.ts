import { Schema, model } from "mongoose";

const IngredientsSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  title: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

export default model("Ingredients", IngredientsSchema);
