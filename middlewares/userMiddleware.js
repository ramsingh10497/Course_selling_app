const { User } = require("../db");

const userMiddleware = async (req, res, next) => {
  const username = req.header("username");
  const password = req.header("password");

  try {
    const userOne = await User.findOne({
      username,
      password,
    });
    if (!userOne) {
      throw new error("Admin does not exist");
    }
    next();
  } catch (error) {
    res.status(403).json({
      msg: "User either not exist or creds failed",
    });
  }
};

module.exports = {
  userMiddleware,
};
