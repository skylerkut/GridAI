const mongoose = require("mongoose");
const { Schema } = mongoose;

const nodeSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String },
  x: { type: String }, 
  y: { type: String },
  text: {
    static: {
      label1: { type: String },
      label2: { type: String },
    },
    dynamic: { type: Schema.Types.Mixed }
  },
  data: { type: Schema.Types.Mixed },
});

const Node = mongoose.model("Node", nodeSchema);
module.exports = Node;
