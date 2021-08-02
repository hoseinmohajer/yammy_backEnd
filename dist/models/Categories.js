"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategoriesSchema = new mongoose_1.Schema({
    recipeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.model("Categories", CategoriesSchema);
//# sourceMappingURL=Categories.js.map