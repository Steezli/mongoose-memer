const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      top,
      bottom,
      image
    } = req.body;

    Meme
      .create({ name, top, bottom, image })
      .then(meme => res.send(meme))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Meme
      .find()
      .then(memes => res.send(memes))
      .catch(next);
  })
  .get('/:id', (req, res, next)=> {
    Meme
      .findById(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const {
      name
    } = req.body;

    Meme
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .then(meme => res.send(meme))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Meme
      .findByIdAndDelete(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  });
