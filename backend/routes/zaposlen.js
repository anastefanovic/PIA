const { sign } = require('crypto');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Zaposlen = require('../models/zaposlen');
const Grupa = require('../models/grupa');
const Predmet = require('../models/predmet');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.use('/testpath', (req, res, next) => {
  res.send('Hello from Rutiranje');
 });


router.post('/saveImage',  multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  console.log("Sacuvana slika");
});

router.post('/signupWithImg',  multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const zaposlen = new Zaposlen({
    ime: req.body.ime,
    prezime: req.body.prezime,
    korime: req.body.korime,
    lozinka: req.body.lozinka,
    email: req.body.email,
    adresa: req.body.adresa,
    mobilni: req.body.mobilni,
    vebsajt: req.body.vebsajt,
    bio: req.body.bio,
    tipZvanja: req.body.tipZvanja,
    zvanje: req.body.zvanje,
    kabinet: parseInt(req.body.kabinet),
    status: req.body.status,
    slikaPath: url + "/images/" + req.file.filename,
    lozinkaChanged: false
  });
  zaposlen.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacen zaposlen',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/signup', (req, res, next) => {
    const zaposlen = new Zaposlen({
      ime: req.body.ime,
      prezime: req.body.prezime,
      korime: req.body.korime,
      lozinka: req.body.lozinka,
      email: req.body.email,
      adresa: req.body.adresa,
      mobilni: req.body.mobilni,
      vebsajt: req.body.vebsajt,
      bio: req.body.bio,
      tipZvanja: req.body.tipZvanja,
      zvanje: req.body.zvanje,
      kabinet: req.body.kabinet,
      status: req.body.status,
      slikaPath: req.body.slikaPath,
      lozinkaChanged: false
    });
    zaposlen.save()
    .then(result => {
      res.status(201).json({
        message: 'Uspesno ubacen zaposlen',
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
  Zaposlen.findOne({korime: req.body.korime, lozinka: req.body.lozinka})
  .then( result => {
    if(!result) {
      console.log('Zaposlen ne postoji');
      return res.status(401).json({
        message: 'Neuspesan login',
        zaposlen: result
      });
    }
    res.status(200).json({
      zaposlen: result
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Neuspesan login'
    });
  });
});

router.get('/getZaposlen/:korime', (req, res, next) => {
  Zaposlen.findOne({korime: req.params.korime})
  .then(result => {
    console.log(result);
    res.status(200).json({
      zaposlen: result
    })
  });
});


router.get('/getAllPredmeti', (req, res, next) => {
  Predmet.find()
  .then(result => {
    console.log(result);
    res.status(200).json({
      svi: result
    })
  });
});

router.get('/getAllZaposlens', (req, res, next) => {
  Zaposlen.find()
  .then(result => {
    console.log(result);
    res.status(200).json({
      svi: result
    })
  });
});

router.get('/getAllGrupe', (req, res, next) => {
  Grupa.find()
  .then(result => {
    console.log(result);
    res.status(200).json({
      sve: result
    })
  });
});

module.exports = router;
