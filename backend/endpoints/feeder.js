const express = require("express");
const router = express.Router();

// Import controllers 
const {
    getAllFeeders,
    getFeederById,
    deleteFeeder,
    updateFeeder,
    postFeeder,
  } = require("../controllers/feedControl");
  
  // GET all feeders
  router.get("/feeders/", getAllFeeders);
  
  // GET a single feeder by ID
  router.get("/feeders/:id", getFeederById);
  
  // DELETE a feed
  router.delete("/feeders/:id", deleteFeeder);
  
  // UPDATE a feed
  router.put("/feeders/:id", updateFeeder);

  // Post a feed
  router.post("/feeders/", postFeeder);

  module.exports = router;