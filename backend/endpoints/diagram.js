const express = require("express");
const router = express.Router();

// Import controllers for diagrams
const {
  getAllDiagrams,
  getDiagramById,
  deleteDiagram,
  updateDiagram,
  postDiagram,
  updateNodes,
  updateLinks,
  getNodes, 
  getLinks, 
} = require("../controllers/diagramControl");

// GET all diagrams
router.get("/diagrams/", getAllDiagrams);

// GET a single diagram by ID
router.get("/diagrams/:id", getDiagramById);

// DELETE a diagram
router.delete("/diagrams/:id", deleteDiagram);

// UPDATE a diagram
router.put("/diagrams/:id", updateDiagram);

// Post a diagram
router.post("/diagrams/", postDiagram);

// GET all nodes
router.get("/diagrams/:id/nodes/", getNodes);

// PUT to update the nodes in a specific diagram
router.put("/diagrams/:id/nodes", updateNodes);

// GET all diagrams
router.get("/diagrams/:id/links/", getLinks);

// PUT to update the links in a specific diagram
router.put("/diagrams/:id/links", updateLinks);

module.exports = router;
