"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RecipeSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model("Recipe", RecipeSchema);
//# sourceMappingURL=Recipe.js.map