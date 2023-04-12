const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  source: [String],
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
