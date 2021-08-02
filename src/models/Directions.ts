import { Schema, model } from "mongoose";

const DirectionsSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
});

export default model("Directions", DirectionsSchema);
