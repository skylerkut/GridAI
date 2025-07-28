const express = require("express");
const router = express.Router();

// Import controllers 
const {
    getAllIcons,
    getIconByName,
    deleteIcon,
    putIcon,
    postIcon,
  } = require("../controllers/iconControl");
  
  // GET all icons
  router.get("/icons/", getAllIcons);
  
  // GET a single icon by name
  router.get("/icons/:name", getIconByName);
  
  // DELETE an icon
  router.delete("/icons/:name", deleteIcon);
  
  // UPDATE an icon
  router.put("/icons/:name", putIcon);

  // Post an icon
  router.post("/icons/", postIcon);

  module.exports = router;