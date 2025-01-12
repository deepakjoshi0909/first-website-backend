const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  response: { type: String, enum: ["Yes", "No"], required: true }
});

module.exports = mongoose.model("Response", responseSchema);
