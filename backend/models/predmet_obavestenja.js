const mongoose = require('mongoose');

const predmet_obavestenjaSchema = mongoose.Schema({
  predmet: {type: String, required: true},
  obavestenje: {type: String, required: true},
  datum: {type: Date, required: true}
});

module.exports = mongoose.model('Predmet_obavestenja', predmet_obavestenjaSchema);
