const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      topText,
      bottomText,
      image
    } = req.body;

    Meme
      .create({ name, topText, bottomText, image })
      .then(meme => res.send(meme))
      .catch(next);
  });
