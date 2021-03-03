const mongoose = require("mongoose");

const SalesSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  expense: {
    type: Number,
    required: false,
  },
  sales: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Sales", SalesSchema);
