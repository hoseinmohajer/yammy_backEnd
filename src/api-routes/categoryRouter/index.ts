import * as express from "express";
import { Response, Request, Router } from "express";
import Categories from "../../models/Categories";
const multer  = require('multer');

const categoryRouter: Router = express.Router();

// Gets back all the categories
categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Categories.find();
    res.json(recipes);
  } catch (error) {
    res.json({ message: error });
  }
});

// Submit category
const fileStorageEngine = multer.diskStorage({
  destination: (req: any,file: any,cd: any)=> {
    // cd(null, `${__dirname}/../../../assets/uploads/categories`)
    cd(null, `./assets/uploads/categories`)
  },
  filename: (req: any,file: any,cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: fileStorageEngine });
categoryRouter.post("/", upload.single('file'), async (req: Request, res: Response) => {
  const post = new Categories({
    title: req.body.title,
    description: req.body.description,
    image: req.file
  });
  try {
    const savedPost = await post.save();
    res.json({ data: [savedPost], message: "Your category created successfully." });
  } catch (err) {
    res.json({ message: `something went wrong ${err}` });
  }
});


export default categoryRouter;
