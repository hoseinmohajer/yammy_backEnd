"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Categories_1 = require("../../models/Categories");
const multer = require('multer');
const categoryRouter = express.Router();
// Gets back all the categories
categoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield Categories_1.default.find();
        res.json(recipes);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// Submit category
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        // cd(null, `${__dirname}/../../../assets/uploads/categories`)
        cd(null, `./assets/uploads/categories`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: fileStorageEngine });
categoryRouter.post("/", upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Categories_1.default({
        title: req.body.title,
        description: req.body.description,
        image: req.file
    });
    try {
        const savedPost = yield post.save();
        res.json({ data: [savedPost], message: "Your category created successfully." });
    }
    catch (err) {
        res.json({ message: `something went wrong ${err}` });
    }
}));
exports.default = categoryRouter;
//# sourceMappingURL=index.js.map