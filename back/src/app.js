import express from "express"

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))

import userRouter from "./routes/user.route.js"
import jobRouter from "./routes/job.routes.js"
import applicationRouter from "./routes/application.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/applications", applicationRouter)

export default app
