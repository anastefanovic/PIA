const mongoose = require('mongoose');

const predavanjeSchema = mongoose.Schema({
  naziv: {type: String, required: true},
  predmet: {type: String, required: true},
  datum: {type: Date, required: true},
  velicina: {type: String, required: true},
  autor: {type: String, required: true},
  fajlPath: {type: String, required: true},
  tip: {type: String, required: true}
});


module.exports = mongoose.model('Predavanje', predavanjeSchema);
