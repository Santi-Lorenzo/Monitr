const express = require("express");
const incomeController = require("../controllers/incomeController");
const authController = require("../controllers/authController");
const router = express.Router();

// fetch all expenses for user
router.get(
  "/",
  authController.authorize,
  incomeController.getIncome,
  (req, res) => res.status(200).json(res.locals.results)
);

// create new expense
router.post(
  "/",
  authController.authorize,
  incomeController.addIncome,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

// updating existing expense
router.put(
  "/",
  authController.authorize,
  incomeController.editIncome,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

// remove existing expense
router.delete(
  "/:id",
  authController.authorize,
  incomeController.deleteIncome,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

module.exports = router;
