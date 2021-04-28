const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = 'mongodb+srv://ComAd:Admin@database.n8bk7.mongodb.net/Names?retryWrites=true&w=majority';

module.exports = mongoose.connect(url, {
  useNewUrlParser: true,
});
