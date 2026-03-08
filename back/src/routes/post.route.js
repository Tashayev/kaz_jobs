import { Router } from "express"
import {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/getPosts").get(getPosts);
router.route("/getPost/:id").get(getPost);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);
router.route("/create").post(createPost);

export default router;