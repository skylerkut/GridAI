const Feeder = require('../schemas/feederSchema');

// Get All Feeders
const getAllFeeders = async (req, res) => {
  const feeders = await Feeder.find();
  if (!feeders) {
    return res.status(400).json({ message: 'No feeders found' });
  }
  res.status(200).json(feeders);
};

// Get a feeder by ID
const getFeederById = async (req, res) => {
  const { id } = req.params;
  const feeder = await Feeder.findById(id);
  
  if (!feeder) {
    return res.status(400).json({ message: 'feeder not found' });
  }
  
  res.status(200).json(feeder);
};

// Delete a feeder
const deleteFeeder = async (req, res) => {
  const { id } = req.params;
  const feeder = await Feeder.findByIdAndDelete(id);
  
  if (!feeder) {
    return res.status(400).json({ message: 'feeder not found' });
  }
  
  res.status(200).json({ message: 'feeder deleted successfully' });
};

// Update feeder
const updateFeeder = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedFeeder = await Feeder.findByIdAndUpdate(id, {data,}, { new: true });

  if (!updatedFeeder) {
    return res.status(400).json({ message: 'feeder not found' });
  }
  res.status(200).json(updatedFeeder);
};

// Post Feed
const postFeeder = async (req, res) => {
  const { feedID, timestamp, data } = req.body;

  const addedFeeder = await Feeder.create({
    feedID, timestamp, data
  });

  if (!addedFeeder) {
    return res.status(400).json({ message: 'Feeder not created' });
  }

  res.status(201).json(addedFeeder);
};


module.exports = {
    getAllFeeders,
    getFeederById,
    deleteFeeder,
    updateFeeder,
    postFeeder,
  };