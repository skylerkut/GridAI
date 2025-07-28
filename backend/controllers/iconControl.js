const Icon = require('../schemas/iconSchema');

// Get All Icons
const getAllIcons = async (req, res) => {
  const icons = await Icon.find();
  if (!icons) {
    return res.status(400).json({ message: 'No icons found' });
  }
  res.status(200).json(icons);
};

// Get a icon by name
const getIconByName = async (req, res) => {
  const { name } = req.params;
  const icon = await Icon.findById(name);
  
  if (!icon) {
    return res.status(400).json({ message: 'icon not found' });
  }
  
  res.status(200).json(icon);
};

// Delete icon
const deleteIcon = async (req, res) => {
  const { name } = req.params;
  const icon = await Icon.findByIdAndDelete(name);
  
  if (!icon) {
    return res.status(400).json({ message: 'icon not found' });
  }
  
  res.status(200).json({ message: 'icon deleted successfully' });
};

// Update icon
const putIcon = async (req, res) => {
  const { name } = req.params;
  const { type } = req.params;
  const { source } = req.params;

  const updatedIcon = await Icon.findByIdAndUpdate(name, type, source, { new: true });

  if (!updatedIcon) {
    return res.status(400).json({ message: 'icon not found' });
  }
  res.status(200).json(updatedIcon);
};

// Post Feed
const postIcon = async (req, res) => {
    const { name } = req.params;
    const { type } = req.params;
    const { source } = req.params;

  const addedIcon = await Icon.create({
    name, type, source
  });

  if (!addedIcon) {
    return res.status(400).json({ message: 'Icon not created' });
  }

  res.status(201).json(addedIcon);
};


module.exports = {
    getAllIcons,
    getIconByName,
    deleteIcon,
    putIcon,
    postIcon,
  };