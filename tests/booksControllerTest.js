/* eslint-disable no-unused-vars */
const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('Testing bookController.js: ', () => {
  describe('POST', () => {
    it('should not allow POST without book title', () => {
      const Book = function(book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: 'Test Author'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = bookController(Book);
      // eslint-disable-next-line require-jsdoc
      async function postTest() {
        await controller.post(req, res);
        // eslint-disable-next-line max-len
        await res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        await res.send.calledWith('Title required').should.equal(true);
      }
      postTest();
      // eslint-disable-next-line max-len
    });
  });
});
