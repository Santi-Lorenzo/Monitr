const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
