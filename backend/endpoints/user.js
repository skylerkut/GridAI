const express = require("express");
const router = express.Router();

//Import controllers
const {
  createUser, 
  getAllUsers, 
  getUser
} = require('../controllers/userControl');

//Get all 
router.get("/users/", getAllUsers);

//Get one 
router.get('/users/:username', getUser);

//Create new 
router.post('/users/', createUser);

//Delete 
router.delete('/users/:id', (req, res) => {
  res.json({mssg: 'DELETE '})
})

module.exports = router;
