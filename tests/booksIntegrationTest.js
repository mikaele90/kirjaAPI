require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'TestENV';
const app = require('../js/app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Create/Replace/Update/Delete Test: ', () => {
  // eslint-disable-next-line max-len
  it('should allow a book to be posted and return "_id"', (done) => {
    const bookPost = {
      title: 'CRUDTest1',
      year: 2020,
      author: 'CRUDtester1',
      genre: 'Testing',
    };
    agent.post('/api/v1/books')
        .send(bookPost)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property('_id');
          // console.log(results);
          done();
        });
  });
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });
  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
