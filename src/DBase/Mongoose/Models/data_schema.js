const mongoose = require('mongoose')

const data_schema = mongoose.Schema({
  sede: {
    type: String,
    required: false
  },
  owner: {
    type: String,
    required: false
  },
  areas: {
    type: Object,
    required: false
  }
})

module.exports = mongoose.model('data', data_schema)
