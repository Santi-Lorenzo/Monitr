const User = require("../models/user");
const bcrypt = require("bcrypt");

usersController = {};

usersController.register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.locals.results = savedUser;
    next();
  } catch (err) {
    next({
      log: `usersController.register: ERROR: ${err}`,
      message: {
        err: "Error ocurred in usersController.register. Check server logs for more details.",
      },
    });
  }
};

module.exports = usersController;
