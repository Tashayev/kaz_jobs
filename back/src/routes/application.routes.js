import { Router } from "express"
import {
  createApplication,
  getApplications,
  deleteApplication,
  updateApplication,
  getApplication,
  getJobApplications,
} from "../controllers/application.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = Router()

router
  .route("/")
  .post(authMiddleware, createApplication)
  .get(authMiddleware, getApplications)

router
  .route("/:id")
  .get(authMiddleware, getApplication)
  .delete(authMiddleware, deleteApplication)
  .patch(authMiddleware, updateApplication)
router.route("/job/:id").get(authMiddleware, getJobApplications)

export default router
