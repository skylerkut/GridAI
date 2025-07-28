const mongoose = require("mongoose");
const { Schema } = mongoose;

const iconSchema = new Schema({
    source: String,
    type: String,
    name: String
  });

  const Icon = mongoose.model("Icon", iconSchema)
  module.exports = Icon;