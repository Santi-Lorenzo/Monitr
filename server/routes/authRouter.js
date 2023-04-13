const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login, (req, res) => {
  res.status(200).json(res.locals.results);
});

module.exports = router;
