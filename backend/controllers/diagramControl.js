const Diagram = require('../schemas/diagramSchema');

// Get All Diagrams
const getAllDiagrams = async (req, res) => {
  const diagrams = await Diagram.find();
  if (!diagrams) {
    return res.status(400).json({ message: 'No diagrams found' });
  }
  res.status(200).json(diagrams);
};

// Get a Diagram by ID
const getDiagramById = async (req, res) => {
  const { id } = req.params;
  const diagram = await Diagram.findById(id);
  
  if (!diagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }
  
  res.status(200).json(diagram);
};

// Delete a Diagram
const deleteDiagram = async (req, res) => {
  const { id } = req.params;
  const diagram = await Diagram.findByIdAndDelete(id);
  
  if (!diagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }
  
  res.status(200).json({ message: 'Diagram deleted successfully' });
};

// Update Diagram
const updateDiagram = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, kind, dataFeedReference, nodes, links } = req.body;

  const updatedDiagram = await Diagram.findByIdAndUpdate(id, {
    title,
    description,
    category,
    kind,
    dataFeedReference,
    nodes,
    links
  }, { new: true });

  if (!updatedDiagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }

  res.status(200).json(updatedDiagram);
};

// Post Diagram
const postDiagram = async (req, res) => {
  const { title, description, category, kind, dataFeedReference, nodes, links } = req.body;

  const addedDiagram = await Diagram.create({
    title,
    description,
    category,
    kind,
    dataFeedReference,
    nodes,
    links
  });

  if (!addedDiagram) {
    return res.status(400).json({ message: 'Diagram not created' });
  }

  res.status(201).json(addedDiagram);
};

// Get all nodes for a specific diagram
const getNodes = async (req, res) => {
  const { id } = req.params;
  const diagram = await Diagram.findById(id);

  if (!diagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }

  res.status(200).json(diagram.nodes);
};


// Update Nodes in a Diagram
const updateNodes = async (req, res) => {
  const { id } = req.params;
  const { nodes } = req.body; // Expect nodes array in the request body

  const updatedDiagram = await Diagram.findByIdAndUpdate(id, { nodes }, { new: true });

  if (!updatedDiagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }

  res.status(200).json(updatedDiagram.nodes);
};

// Get all nodes for a specific diagram
const getLinks = async (req, res) => {
  const { id } = req.params;
  const diagram = await Diagram.findById(id);

  if (!diagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }

  res.status(200).json(diagram.links);
};

// Update Links in a Diagram
const updateLinks = async (req, res) => {
  const { id } = req.params;
  const { links } = req.body; // Expect links array in the request body

  const updatedDiagram = await Diagram.findByIdAndUpdate(id, { links }, { new: true });

  if (!updatedDiagram) {
    return res.status(400).json({ message: 'Diagram not found' });
  }

  res.status(200).json(updatedDiagram.links);
};

module.exports = {
  getAllDiagrams,
  getDiagramById,
  deleteDiagram,
  updateDiagram,
  postDiagram,
  updateNodes,
  updateLinks,
  getNodes, 
  getLinks, 
};
