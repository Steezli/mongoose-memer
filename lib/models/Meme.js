const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  topText: {
    type: String,
  },
  bottomText: {
    type: String,
  },
  image: {
    type: String,
    required: true
  }
  
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
