const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/", usersController.register, (req, res) => {
  res.status(200).json(res.locals.results);
});

module.exports = router;
