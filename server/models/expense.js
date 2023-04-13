const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: Date,
  name: String,
  amount: Number,
  category: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
