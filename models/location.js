var mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
  coords: {lat: Number, lng : Number},
  content: String,
})
module.exports = mongoose.model('Location', locationSchema);
