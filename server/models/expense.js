const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: Date,
  item: String,
  amount: Number,
  categories: [String],
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
