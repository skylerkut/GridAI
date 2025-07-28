const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = 8080;

const diagramRoutes = require("./endpoints/diagram"); 
const feederRoutes = require("./endpoints/feeder"); 
const userRoutes = require("./endpoints/user");
const iconRoutes = require("./endpoints/icons");

require('dotenv').config();
const URI =  ''; //Database link here, removed from git upload for security

app.use(cors());
app.use(express.json());

app.use("/api", diagramRoutes);
app.use("/api", userRoutes);
app.use("/api", feederRoutes);
app.use("/api", iconRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose.connect(URI)
  .then(()=>{
    app.listen(PORT, function() {
      console.log(`Listening on ${PORT}`); 
    });
  })
  .catch((error) => {
    console.log(error)
  });




