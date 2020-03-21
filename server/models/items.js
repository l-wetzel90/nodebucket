const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  text: {
    type: String
  }
});

module.exports = itemSchema;
