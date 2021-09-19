const mongoose = require('mongoose');

const obavestenjeSchema = mongoose.Schema({
  sadrzaj: {type: String, required: true},
  tip: {type: Number, required: true},
  datum: {type: Date, required: true}
});


module.exports = mongoose.model('Obavestenje', obavestenjeSchema);
