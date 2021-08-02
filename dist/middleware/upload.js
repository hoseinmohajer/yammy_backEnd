"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../../assets/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '.png');
    },
});
let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
//# sourceMappingURL=upload.js.map