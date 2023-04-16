const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
