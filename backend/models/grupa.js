const mongoose = require('mongoose');

const grupaSchema = mongoose.Schema({
  predmet: {type: String, required: true},
  grupa: {type: String, required: true},
  nastavnici: {type: [String], required: true},
  semestar: {type: Number, required: true}
});


module.exports = mongoose.model('Grupa', grupaSchema);
