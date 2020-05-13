var mongoose = require('mongoose')
const utSchema = new mongoose.Schema({
  username: String,
  message: String,
})
module.exports = mongoose.model('UserTransactions', utSchema);
