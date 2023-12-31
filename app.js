const express = require("express");
const dotenv = require("dotenv");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
// const fileUpload = require("express-fileupload");
const mongooseSanitize = require("express-mongo-sanitize");
const root = require("app-root-path");
const cors = require("cors");
const path = require("path");

const db = require("./db/index");
const errorMsg = require("./errorHandler/ErrorHandler");
const app = express();
dotenv.config();
db();
const auth = require("./app/middlewares/auth");

//
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const messageRoute = require("./routes/message");
const friendRequestRoute = require("./routes/friendRequest");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const notificationRoute = require("./routes/notification");
const {
  changeProfile,
  changePassword,
} = require("./app/controllers/AuthController");
const { asyncHandler } = require("./utils");
const friendRoute = require("./routes/friend");
const { index } = require("./app/controllers/SearchController");
const upload = require("./utils/multer");
//middleware
// app.use(express.static("public"));
app.use(express.json());
app.use(express.static(`${root.path}/public/image`));
app.use(express.static(`${root.path}/public/video`));
app.use(express.static("client/build"));
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(helmet());
// app.use(fileUpload());
// app.use(upload.single("image"));
// app.use(upload.single("avatar"));
app.use(mongooseSanitize());

//routes
app.put(
  "/api/auth/change-profile",
  upload.single("profile"),
  auth,
  asyncHandler(changeProfile)
);
app.put("/api/auth/change-password", auth, asyncHandler(changePassword));
app.get("/api/search", auth, asyncHandler(index));
app.use("/api/auth", authRoute);
app.use("/api/users", auth, userRoute);
app.use("/api/profile", auth, profileRoute);
app.use("/api/posts", upload.single("image"), auth, postRoute);
app.use("/api/notifications", auth, notificationRoute);
app.use("/api/messages", auth, messageRoute);
app.use("/api/friend-request", auth, friendRequestRoute);
app.use("/api/friends", auth, friendRoute);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const appErr = new errorMsg(app);
app.use(appErr.handler);

const PORT = process.env.PORT || process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(process.env.HOST + PORT);
});
