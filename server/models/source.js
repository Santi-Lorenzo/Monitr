const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
