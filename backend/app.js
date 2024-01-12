const express = require("express");
const cors = require("cors");
const EventRouter = require("./router/Events/events.routes");
const UserRouter = require("./router/User/user.routes");
const TaskRouter = require("./router/Tasks/tasks.routes");
const CommentRouter = require("./router/Comment/comment.routes")

const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000","https://softech-calendar.netlify.app"],
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//routers

app.use("/api/events", EventRouter);
app.use("/api/user", UserRouter);
app.use("/api/tasks", TaskRouter);
app.use("/api/comments",CommentRouter)

app.get("/*", (req, res) => {
  res.status(200).json({ message: "Server is setup" });
});

module.exports = app;
