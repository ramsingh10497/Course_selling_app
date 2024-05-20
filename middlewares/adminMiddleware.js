const { Admin } = require("../db");

const adminMiddleware = async (req, res, next) => {
  const username = req.header("username");
  const password = req.header("password");

  try {
    const adminUser = await Admin.findOne({
      username,
      password,
    });
    if (!adminUser) {
      throw new error("Admin does not exist");
    }
    next();
  } catch (error) {
    res.status(403).json({
      msg: "Admin either not exist or creds failed",
    });
  }
};

module.exports = {
  adminMiddleware,
};
