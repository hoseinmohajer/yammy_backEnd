"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: false,
        min: 6,
        max: 255,
    },
    lastName: {
        type: String,
        required: false,
        min: 6,
        max: 255,
    },
    phoneNumber: {
        type: String,
        required: false,
        min: 6,
        max: 255,
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    address: {
        type: String,
        required: false,
        min: 6,
        max: 255
    }
});
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=User.js.map