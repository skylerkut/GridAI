const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new Schema({
    source: String,
    target: String,
    type: String,
    label: Schema.Types.Mixed,
    dynamic: Schema.Types.Mixed,
    data: Schema.Types.Mixed
  });

  const Link = mongoose.model("Link", linkSchema)
  module.exports = Link;