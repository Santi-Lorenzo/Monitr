const User = require("../models/user");
const Income = require("../models/income");

const incomeController = {};

incomeController.getIncome = (req, res, next) => {
  User.findById(res.locals.id)
    .populate("income")
    .then((result) => {
      res.locals.results = result.income;
      next();
    })
    .catch((err) => {
      next({
        log: `incomeController.getIncome: ERROR: ${err}`,
        message: {
          err: "incomeController.getIncome. Check server logs for more details.",
        },
      });
    });
};

incomeController.addIncome = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.id);
    if (!user) {
      next({
        log: "incomeController.addIncome Invalid User",
        message: {
          err: "Error ocurred in incomeController.addIncome. Check server logs for more details.",
        },
      });
    }
    const { date, amount, source } = req.body;

    const income = new Income({
      date,
      amount,
      source,
      user: res.locals.id,
    });

    const savedIncome = await income.save();
    res.locals.results = savedIncome;

    user.income = user.income.concat(savedIncome._id);
    await user.save();
    next();
  } catch (err) {
    next({
      log: `incomeController.addIncome: ERROR: ${err}`,
      message: {
        err: "Error ocurred in incomeController.addIncome. Check server logs for more details.",
      },
    });
  }
};

incomeController.editIncome = async (req, res, next) => {
  try {
    const { date, amount, source, _id } = req.body;
    update = {
      date,
      amount,
      source,
    };

    const updatedIncome = await Income.findOneAndUpdate({ _id }, update, {
      new: true,
    });
    res.locals.results = updatedIncome;
    next();
  } catch (err) {
    next({
      log: `eincomeController.editIncome: ERROR: ${err}`,
      message: {
        err: "Error ocurred in incomeController.editIncome. Check server logs for more details.",
      },
    });
  }
};

incomeController.deleteIncome = async (req, res, next) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    const userId = deletedIncome.user;
    await User.findByIdAndUpdate(
      userId,
      { $pull: { income: req.params.id } },
      { new: true }
    );

    res.locals.results = deletedIncome;
    next();
  } catch (err) {
    next({
      log: `incomeController.deleteIncome: ERROR: ${err}`,
      message: {
        err: "Error ocurred in incomeController.deleteIncome. Check server logs for more details.",
      },
    });
  }
};

module.exports = incomeController;
