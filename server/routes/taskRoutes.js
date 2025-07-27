import express from "express";
import multer from 'multer';


import {
    createTask,
    getTasks,
    getSingleTask,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js"

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // create "uploads" folder in root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });


const router = express.Router();

router.post('/', upload.single('image'),createTask);

router.get("/",getTasks);
router.get("/:id",getSingleTask);

router.put("/:id", upload.single('image'), updateTask);
router.delete("/:id",deleteTask);

export default router;
