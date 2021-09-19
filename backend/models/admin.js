const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  korime: {type: String, required: true, unique: true},
  lozinka: {type: String, required: true},
  lozinkaChanged: {type: Boolean, required: true}
});

module.exports = mongoose.model('Admin', adminSchema);
