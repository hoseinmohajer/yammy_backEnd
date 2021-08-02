"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IngredientsSchema = new mongoose_1.Schema({
    recipeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.model("Ingredients", IngredientsSchema);
//# sourceMappingURL=Ingredients.js.map