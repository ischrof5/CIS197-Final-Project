var mongoose = require('mongoose')
const spaceSchema = new mongoose.Schema({
  space_name: String,
  password: String,
  max_budget: Number
})
module.exports = mongoose.model('Space', spaceSchema);
