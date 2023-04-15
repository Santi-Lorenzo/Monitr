const Category = require("../models/category");
const User = require("../models/user");

const categoriesController = {};

categoriesController.getCategories = (req, res, next) => {
  console.log("hi");
  User.findById(res.locals.id)
    .populate("categories")
    .then((result) => {
      res.locals.results = result.categories;
      next();
    })
    .catch((err) => {
      next({
        log: `categoriesController.getCategories: ERROR: ${err}`,
        message: {
          err: "Error ocurred in categoriesController.getCategories. Check server logs for more details.",
        },
      });
    });
};

categoriesController.addCategory = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.id);
    if (!user) {
      next({
        log: "categoriesController.addCategory Invalid User",
        message: {
          err: "Error ocurred in categoriesController.addCategory. Check server logs for more details.",
        },
      });
    }
    const { name } = req.body;

    const category = new Category({
      name,
      user: res.locals.id,
    });

    const savedCategory = await category.save();
    res.locals.results = savedCategory;

    user.categories = user.categories.concat(savedCategory._id);
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

categoriesController.editCategory = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, _id } = req.body;
    update = {
      name,
    };

    const updatedCategory = await Category.findOneAndUpdate({ _id }, update, {
      new: true,
    });
    res.locals.results = updatedCategory;
    next();
  } catch (err) {
    next({
      log: `categoriesController.editCategory: ERROR: ${err}`,
      message: {
        err: "Error ocurred in categoriesController.editCategory. Check server logs for more details.",
      },
    });
  }
};

categoriesController.deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    const userId = deletedCategory.user;
    await User.findByIdAndUpdate(
      userId,
      { $pull: { categories: req.params.id } },
      { new: true }
    );

    res.locals.results = deletedCategory;
    next();
  } catch (err) {
    next({
      log: `categoriesController.deleteCategory: ERROR: ${err}`,
      message: {
        err: "Error ocurred in categoriesController.deleteCategory. Check server logs for more details.",
      },
    });
  }
};

module.exports = categoriesController;
