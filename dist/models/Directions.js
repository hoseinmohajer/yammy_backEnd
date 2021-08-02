"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DirectionsSchema = new mongoose_1.Schema({
    recipeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.model("Directions", DirectionsSchema);
//# sourceMappingURL=Directions.js.map