var mongoose = require('mongoose')
const budgetSchema = new mongoose.Schema({
  _id: Object,
  username: String,
  income: Number,
  needs: Number,
  wants: Number,
  savings: Number,
})
module.exports = mongoose.model('Budget', budgetSchema);
