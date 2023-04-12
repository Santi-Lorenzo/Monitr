const expenseModel = require("../models/expense");
const User = require("../models/user");
const Expense = require("../models/expense");

const expensesController = {};

expensesController.getExpenses = (req, res, next) => {
  res.locals.id = "64372b962e9dfd37338c3b2d";
  User.findById(res.locals.id)
    .populate("expenses")
    .then((result) => {
      res.locals.results = result.expenses;
      next();
    })
    .catch((err) => {
      next({
        log: `expensesController.getExpenses: ERROR: ${err}`,
        message: {
          err: "Error ocurred in expensesController.getExpenses. Check server logs for more details.",
        },
      });
    });
};

expensesController.addExpense = async (req, res, next) => {
  try {
    res.locals.id = "64372b962e9dfd37338c3b2d";
    const user = await User.findById(res.locals.id);
    if (!user) {
      next({
        log: "expensesController.addExpense Invalid User",
        message: {
          err: "Error ocurred in expensesController.addExpense. Check server logs for more details.",
        },
      });
    }
    const { date, item, amount, categories } = req.body;

    const expense = new expenseModel({
      date,
      item,
      amount,
      categories,
      user: res.locals.id,
    });

    const savedExpense = await expense.save();
    res.locals.results = savedExpense;

    user.expenses = user.expenses.concat(savedExpense._id);
    await user.save();
    next();
  } catch (err) {
    next({
      log: `expensesController.addExpense: ERROR: ${err}`,
      message: {
        err: "Error ocurred in expensesController.addExpense. Check server logs for more details.",
      },
    });
  }
};

expensesController.editExpense = async (req, res, next) => {
  try {
    const { date, item, amount, categories, expenseId } = req.body;
    update = {
      date,
      item,
      amount,
      categories,
    };
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId },
      update,
      { new: true }
    );
    res.locals.results = updatedExpense;
    next();
  } catch (err) {
    next({
      log: `expensesController.editExpense: ERROR: ${err}`,
      message: {
        err: "Error ocurred in expensesController.editExpense. Check server logs for more details.",
      },
    });
  }
};

expensesController.deleteExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.body;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    const userId = deletedExpense.user;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { expenses: expenseId } },
      { new: true }
    );

    res.locals.results = updatedUser;
    next();
  } catch (err) {
    next({
      log: `expensesController.deleteExpense: ERROR: ${err}`,
      message: {
        err: "Error ocurred in expensesController.deleteExpense. Check server logs for more details.",
      },
    });
  }
};

expensesController.getCategories = (req, res, next) => {
  try {
    res.locals.id = "643733eb74d6f4e4f36bae54";
    User.findById(res.locals.id).then((result) => {
      res.locals.results = result.categories;
      next();
    });
  } catch (err) {
    next({
      log: `expensesController.getCategories: ERROR: ${err}`,
      message: {
        err: "Error ocurred in expensesController.getCategories. Check server logs for more details.",
      },
    });
  }
};

expensesController.changeCategories = async (req, res, next) => {
  try {
    res.locals.id = "643733eb74d6f4e4f36bae54";
    const { categories } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.locals.id },
      { $set: { categories: categories } },
      { new: true }
    );

    res.locals.results = updatedUser;
    next();
  } catch (err) {
    next({
      log: `expensesController.changeCategories: ERROR: ${err}`,
      message: {
        err: "Error ocurred in expensesController.changeCategories. Check server logs for more details.",
      },
    });
  }
};

module.exports = expensesController;
