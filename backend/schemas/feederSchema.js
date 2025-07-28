const mongoose = require("mongoose");
const { Schema } = mongoose;

const feederSchema = new Schema({
    feedId: String, 
    timestamp: Date, 
    data: { type: Schema.Types.Mixed }
});

  const Feeder = mongoose.model("Feeder", feederSchema)
  module.exports = Feeder;