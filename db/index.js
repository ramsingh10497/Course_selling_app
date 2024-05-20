const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB connected");
});

const adminSchema = mongoose.Schema({
  username: String,
  password: String,
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
});

const purchasedCourseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
});

const Admin = mongoose.model("admin", adminSchema);
const User = mongoose.model("user", userSchema);
const Course = mongoose.model("course", courseSchema);
const PurchaseCourse = mongoose.model("purchasedCourse", purchasedCourseSchema);

module.exports = {
  Admin,
  User,
  Course,
  PurchaseCourse,
};
