const mongoose = require("mongoose");
const { Schema } = mongoose;
const Link = require("./linkSchema");
const Node = require("./nodeSchema");

const diagramSchema = new Schema({
      title: String,
      description: String,
      createdAt: Date,
      category: String,
      kind: String,
      dataFeedReference: String, 
      nodes: [Node.schema], 
      links: [Link.schema], 
  });
  
  const Diagram = mongoose.model("Diagram", diagramSchema);
  module.exports = Diagram;