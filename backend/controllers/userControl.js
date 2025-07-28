const User = require('../schemas/userSchema');

//Get All
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

//Get one
const getUser = async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ 'user.username': username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

//Create new
const createUser = async (req, res) => {
    const {user} = req.body; //Get properties from request body

    try {
        const newUser = new User({ user }); //Create new user object
        await newUser.save(); //save object
        res.status(200).json(newUser); 
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

//Delete

//Update

module.exports = {
    createUser, 
    getAllUsers, 
    getUser
}
