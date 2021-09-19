const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const zaposlenSchema = mongoose.Schema({
  ime: {type: String, required: true},
  prezime: {type: String, required: true},
  korime: {type: String, required: true, unique: true},
  lozinka: {type: String, required: true},
  email: {type: String, required: true},
  adresa: {type: String, required: true},
  mobilni: {type: String, default: null},
  vebsajt: {type: String, default: null},
  bio: {type: String, default: null},
  tipZvanja: {type: String, required: true},
  zvanje: {type: String, required: true},
  kabinet: {type: Number, required: true},
  status: {type: String, required: true},
  slikaPath: {type: String},
  lozinkaChanged: {type: Boolean, required: true}
});

zaposlenSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Zaposlen', zaposlenSchema);
