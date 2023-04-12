const express = require("express");
const expensesController = require("../controllers/expensesController");
const router = express.Router();

// fetch all expenses for user
router.get("/", expensesController.getExpenses, (req, res) =>
  res.status(200).json(res.locals.results)
);

// create new expense
router.post("/", expensesController.addExpense, (req, res) => {
  res.status(200).json(res.locals.results);
});

// updating existing expense
router.put("/", expensesController.editExpense, (req, res) => {
  res.status(200).json(res.locals.results);
});

// remove existing expense
router.delete("/", expensesController.deleteExpense, (req, res) => {
  res.status(200).json(res.locals.results);
});

// get collections
router.get("/categories", expensesController.getCategories, (req, res) =>
  res.status(200).json(res.locals.results)
);

// change collections
router.post("/categories", expensesController.changeCategories, (req, res) =>
  res.status(200).json(res.locals.results)
);

module.exports = router;
