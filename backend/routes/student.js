const { sign } = require('crypto');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Raspored = require('../models/raspored');
const Predmet = require('../models/predmet');


router.post('/signup', (req, res, next) => {
  const student = new Student({
    ime: req.body.ime,
    prezime: req.body.prezime,
    korime: req.body.korime,
    lozinka: req.body.lozinka,
    indeks: req.body.indeks,
    tipStudija: req.body.tipStudija,
    status: req.body.status,
    lozinkaChanged: false
  });
  student.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacen student',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/login', (req, res, next) => {
  Student.findOne({korime: req.body.korime, lozinka: req.body.lozinka})
  .then( result => {
    if(!result) {
      console.log('Student ne postoji');
      return res.status(401).json({
        message: 'Neuspesan login',
        student: result
      });
    }
    res.status(200).json({
      student: result
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Neuspesan login'
    });
  });
});

router.get('/getStudent/:god/:br/:tipStudija', (req, res, next) => {
  Student.findOne({indeks: req.params.god + '/' + req.params.br, tipStudija: req.params.tipStudija})
  .then(result => {
    console.log(req.params.god);
    console.log(req.params.br);
    console.log(req.params.tipStudija);
    console.log(result);
    res.status(200).json({
      student: result
    })
  });
});

router.get('/getStudentByKorime/:korime', (req, res, next) => {
  Student.findOne({korime: req.params.korime})
  .then(result => {
    console.log(result);
    res.status(200).json({
      student: result
    })
  });
});

router.get('/getRaspored/:korime', (req, res, next) => {
  Raspored.find({student: req.params.korime})
  .then(result => {
    console.log(result);
    res.status(200).json({
      raspored: result
    })
  });
});

router.get('/getPredmeti', (req, res, next) => {
  Predmet.find()
  .then(result => {
    console.log('SVI PREDMETI');
    res.status(200).json({
      predmeti: result
    })
  });
});

module.exports = router;
