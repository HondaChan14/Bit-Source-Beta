const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  Post: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Post', PostSchema)
