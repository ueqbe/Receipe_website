// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeModel = require('./models/recipe');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/recipe");

// POST route to add a favorite
app.post("/addFav", (req, res) => {
  const { label, time, url } = req.body;
  const newFavorite = new recipeModel({ dishName: label, cookingTime: time, url });
  newFavorite.save()
    .then(() => res.json({ message: "Favorite added successfully" }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET route to fetch all favorites
app.get("/getFav", (req, res) => {
  recipeModel.find({})
    .then(favs => {
      res.json(favs);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


