import { Router } from "express"
import { createJob, getJobs, deleteJob } from "../controllers/job.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js" 

const router = Router()

router.route("/").post(authMiddleware, createJob).get(getJobs)
router.route("/:id").delete(authMiddleware, deleteJob)

export default router