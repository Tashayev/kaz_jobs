import express from "express"

const app = express();
app.use(express.json());

import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

export default app;