const mongoose = require('mongoose');

const rasporedSchema = mongoose.Schema({
  student: {type: String, required: true},
  predmet: {type: String, required: true},
  grupa: {type: String, required: true}
});

module.exports = mongoose.model('Raspored', rasporedSchema);
