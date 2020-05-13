var mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  space: String,
  all_spaces: [String]
})
module.exports = mongoose.model('User', userSchema);
