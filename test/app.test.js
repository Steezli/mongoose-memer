require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ name: 'breath', topText: 'take a breath when you get the chance', bottomText: 'You dont know when youll get the next one', image: 'https://thoughtcatalog.files.wordpress.com/2015/06/shutterstock_228683719.jpg?w=786&h=524' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'breath',
          topText: 'take a breath when you get the chance',
          bottomText: 'You dont know when youll get the next one',
          image: 'https://thoughtcatalog.files.wordpress.com/2015/06/shutterstock_228683719.jpg?w=786&h=524',
          __v: 0
        });
      });
  });
  it('can get a meme', async() => {
    const meme = await Meme.create({ name: 'Say what?'});

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });
  it('can GET a meme by id', async() => {
    const meme = await Meme.create({ name: 'yo momma so fat!' });

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'yo momma so fat!',
          __v: 0
        });
      });
  });
  it('can update a meme using PATCH', async() => {
    const meme = await Meme.create({ name: 'yo momma so fat!' });

    return request(app)
      .put(`/api/v1/memes/${meme._id}`)
      .send({ name: 'not yo momma' })
      .then(res => {
        expect(res.body.name).toEqual('not yo momma');
      });
  });
  it('can DELETE a meme', async() => {
    const meme = await Meme.create({ name: 'not yo momma' });

    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body.name).toEqual('not yo momma');
      });
  });
});
