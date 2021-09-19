const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Rok = require('../models/rok');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/zip': 'zip',
  'application/vnd.ms-powerpoint': 'ppt'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/rokovi");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});

router.post('/saveRok',  multer({storage: storage}).single("fajl"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const rok = new Rok({
    naziv: req.body.naziv,
    predmet: req.body.predmet,
    datum: new Date(req.body.datum),
    tip: req.body.tip,
    fajlPath: url + "/rokovi/" + req.file.filename
  });
  rok.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacen fajl',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


router.get('/getZadaci/:predmet', (req, res, next) => {
  Rok.find({predmet: req.params.predmet, tip: 'Z'})
  .then(result => {
    console.log('Zadaci');
    res.status(200).json({
      sve: result
    })
  });
});

router.get('/getResenja/:predmet', (req, res, next) => {
  Rok.find({predmet: req.params.predmet, tip: 'R'})
  .then(result => {
    console.log('Resenja');
    res.status(200).json({
      sve: result
    })
  });
});

router.delete('/deleteRok/:id', (req, res, next) => {
  Rok.deleteOne({_id: req.params.id})
  .then(result => {
    console.log('Obrisan zaposlen');
    res.status(200).json({message: 'Obrisan rok'});
  });
});

module.exports = router;
