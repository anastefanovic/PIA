const mongoose = require('mongoose');

const rokSchema = mongoose.Schema({
  naziv: {type: String, required: true},
  predmet: {type: String, required: true},
  datum: {type: Date, required: true},
  fajlPath: {type: String, required: true},
  tip: {type: String, required: true}
});


module.exports = mongoose.model('Rok', rokSchema);

