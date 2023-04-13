const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = {};

authController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    res.locals.results = token;
    next();
  } catch (err) {
    next({
      log: `authController.login: ERROR: ${err}`,
      message: {
        err: "Error ocurred in authController.login. Check server logs for more details.",
      },
    });
  }
};

module.exports = authController;
