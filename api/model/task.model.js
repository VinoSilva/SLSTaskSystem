const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);