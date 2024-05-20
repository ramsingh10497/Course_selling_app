const express = require("express");
const { Admin, Course } = require("../db");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const router = express.Router();

// test Admin route
router.get("/", adminMiddleware, (req, res) => {
  res.json({
    message: "Admin routing working properly",
  });
});

// Created Admin user
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  });

  res.json({
    msg: "Admin User Created Sucessfully",
  });
});

// Create new course
router.post("/course", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;

  const adminDetail = Admin.findOne({
    username: req.header("username"),
  });

  const courseDetail = await Course.create({
    title,
    description,
    image,
    price,
    createdBy: adminDetail?._id,
  });

  res.json({
    msg: "Course Created Sucessfully",
    courseId: courseDetail?._id,
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

module.exports = router;
