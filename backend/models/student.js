const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  ime: {type: String, required: true},
  prezime: {type: String, required: true},
  korime: {type: String, required: true, unique: true},
  lozinka: {type: String, required: true},
  indeks: {type: String, required: true},
  tipStudija: {type: String, required: true},
  status: {type: String, required: true},
  lozinkaChanged: {type: Boolean, required: true}
});

module.exports = mongoose.model('Student', studentSchema);
