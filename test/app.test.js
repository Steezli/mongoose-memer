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
});
