
import { Router } from "express"
import {
  createApplication,
  getApplications,
  deleteApplication,
} from "../controllers/application.controller.js"
import authService from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/applications")
  .post(authService,createApplication)
  .get(getApplications)

router.route("/applications/:id")
  .delete(deleteApplication)

export default router;