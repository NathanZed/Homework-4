const Mongoose = require('mongoose');

module.exports = Mongoose.model('user', new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}));
