const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Zaposlen = require('./models/zaposlen');
const Student = require('./models/student');
const Admin = require('./models/admin');
const Predmet = require('./models/predmet');
const Rok = require('./models/rok');
const Predmet_obavestenja = require('./models/predmet_obavestenja');
const path = require('path');


const app = express();

const zaposlenRoutes = require('./routes/zaposlen');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const predmetRoutes = require('./routes/predmet');
const rokRoutes = require('./routes/rok');

mongoose.connect('mongodb://localhost/testbaza', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Uspesna konekcija');
})
.catch(() => {
  console.log('Neuspesna konekcija');
});


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, DELETE, OPTIONS, PUT" );
  next();
 });

app.use("/images", express.static(path.join("backend/images")));
app.use("/slider_images", express.static(path.join("backend/slider_images")));
app.use("/predavanja", express.static(path.join("backend/predavanja")));
app.use("/rokovi", express.static(path.join("backend/rokovi")));

app.use('/api/zaposlen', zaposlenRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/predmet', predmetRoutes);
app.use('/api/rok', rokRoutes);

module.exports = app;
