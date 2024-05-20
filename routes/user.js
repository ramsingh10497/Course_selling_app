const express = require("express");
const { User, PurchaseCourse } = require("../db");
const { userMiddleware } = require("../middlewares/userMiddleware");
const router = express.Router();

//Testing Purpose
router.get("/", (req, res) => {
  res.json({
    message: "User routing working properly",
  });
});

// User Signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });

  res.json({
    msg: "User Created Sucessfully",
  });
});

// List all courses
router.get("/courses", async (req, res) => {
  const courseDetail = await Course.find({});

  res.json({
    msg: "Done",
    courses: courseDetail,
  });
});

// Purchase course
router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const userDetail = await User.findOne({
    username: req.header("username"),
  });
  const { courseId } = req.params;

  console.log(userDetail, "userDetail");

  await PurchaseCourse.create({
    userId: userDetail?._id,
    courseId,
  });

  res.json({
    msg: "Purchased Succefully",
  });
});

// List Purchased course
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.header("username");
  const userDetail = await User.findOne({ username });
  const courseList = await PurchaseCourse.find({
    userId: userDetail?._id,
  });

  res.json({
    msg: "Purchased Course List",
    courses: courseList,
  });
});

module.exports = router;
