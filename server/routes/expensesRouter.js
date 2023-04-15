const express = require("express");
const expensesController = require("../controllers/expensesController");
const authController = require("../controllers/authController");
const router = express.Router();

// fetch all expenses for user
router.get(
  "/",
  authController.authorize,
  expensesController.getExpenses,
  (req, res) => res.status(200).json(res.locals.results)
);

// create new expense
router.post(
  "/",
  authController.authorize,
  expensesController.addExpense,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

// updating existing expense
router.put(
  "/",
  authController.authorize,
  expensesController.editExpense,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

// remove existing expense
router.delete(
  "/:id",
  authController.authorize,
  expensesController.deleteExpense,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

module.exports = router;
