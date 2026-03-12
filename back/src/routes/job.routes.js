import { Router } from "express"
import {
  createJob,
  getJobs,
  deleteJob,
  getJob,
  updateJob,
} from "../controllers/job.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/").post(authMiddleware, createJob).get(getJobs)

router
  .route("/:id")
  .delete(authMiddleware, deleteJob)
  .get(getJob)
  .patch(authMiddleware, updateJob)

export default router
