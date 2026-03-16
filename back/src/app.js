import dotenv from "dotenv"
dotenv.config({ path: "./.env" }) 
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import jobRouter from "./routes/job.routes.js"
import applicationRouter from "./routes/application.routes.js"

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})




app.use("/api/v1/users", userRouter)
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/applications", applicationRouter)

export default app
