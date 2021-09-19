const mongoose = require('mongoose');

const predmetSchema = mongoose.Schema({
  ime: {type: String, required: true},
  sifra: {type: String, required: true, unique: true},
  tip: {type: String, required: true},
  espb: {type: Number, required: true},
  cilj: {type: String},
  predavanja: {type: String, required: true},
  vezbe: {type: String, required: true},
  nastavnici: {type: [String], required: true},
  propozicije: {type: String},
  semestar: {type: Number, required: true},
  smer: {type: String, required: true}
});


module.exports = mongoose.model('Predmet', predmetSchema);
