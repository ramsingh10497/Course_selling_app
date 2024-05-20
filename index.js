const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();
const port = 3000;

app.use(bodyParser.json());

//routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`App running on port on ${port}`);
});
