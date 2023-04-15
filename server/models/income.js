const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  source: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
