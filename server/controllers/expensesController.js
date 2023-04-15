const User = require("../models/user");
const Expense = require("../models/expense");

const expensesController = {};

expensesController.getExpenses = (req, res, next) => {
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
    const user = await User.findById(res.locals.id);
    if (!user) {
      next({
        log: "expensesController.addExpense Invalid User",
        message: {
          err: "Error ocurred in expensesController.addExpense. Check server logs for more details.",
        },
      });
    }
    const { date, name, amount, category } = req.body;

    const expense = new Expense({
      date,
      name,
      amount,
      category,
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
    const { date, name, amount, category, _id } = req.body;
    update = {
      date,
      name,
      amount,
      category,
    };

    const updatedExpense = await Expense.findOneAndUpdate({ _id }, update, {
      new: true,
    });
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
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    const userId = deletedExpense.user;
    await User.findByIdAndUpdate(
      userId,
      { $pull: { expenses: req.params.id } },
      { new: true }
    );

    res.locals.results = deletedExpense;
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

module.exports = expensesController;
