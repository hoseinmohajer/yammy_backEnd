import { Schema, model } from "mongoose";

const CategoriesSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    contentType: String,
  },
  description: {
    type: String,
  }
});

export default model("Categories", CategoriesSchema);
