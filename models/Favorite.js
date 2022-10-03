const mongoose = require('mongoose')

const FavSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  Link: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Favorite', PostSchema)

//Make button into a post method
