const { sign } = require('crypto');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Predmet = require('../models/predmet');
const Predmet_obavestenja =require('../models/predmet_obavestenja');
const Zaposlen =require('../models/zaposlen');
const Predavanje = require('../models/predavanje');
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
    cb(error, "backend/predavanja");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});

router.post('/savePredavanje',  multer({storage: storage}).single("fajl"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const predavanje = new Predavanje({
    naziv: req.body.naziv,
    predmet: req.body.predmet,
    velicina: req.body.velicina,
    autor: req.body.autor,
    datum: Date.now(),
    tip: req.body.tip,
    fajlPath: url + "/predavanja/" + req.file.filename
  });
  predavanje.save()
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



router.get('/info/:sifra', (req, res, next) => {
  Predmet.findOne({sifra: req.params.sifra})
  .then(result => {
    res.status(200).json({
      predmet: result
    })
  });
});

router.get('/nastavnici', (req, res, next) => {
  Zaposlen.find()
  .then(result => {
    res.status(200).json({
      nastavnici: result
    })
  });
});

router.get('/obavestenja/:sifra', (req, res, next) => {
  Predmet_obavestenja.find({predmet: req.params.sifra})
  .then(result => {
    res.status(200).json({
      obavestenja: result
    })
  });
});

router.get('/getAllPredmets/:smer', (req, res, next) => {
  Predmet.find({smer: req.params.smer})
  .then(result => {
    console.log('SVI PREDMETI');
    res.status(200).json({
      svi: result
    })
  });
});

router.post('/insertObavestenje', (req, res, next) => {
  const obavestenje = new Predmet_obavestenja({
    predmet: req.body.predmet,
    obavestenje: req.body.obavestenje,
    datum: req.body.datum
  });
  obavestenje.save()
  .then(result => {
    console.log('Uspesno ubaceno obavestenje');
    res.status(201).json({
      message: 'Uspesno ubaceno obavestenje',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/deleteObavestenje/:id', (req, res, next) => {
  Predmet_obavestenja.deleteOne({_id: req.params.id})
  .then(result => {
    console.log('Obrisano obavestenje predmeta');
    res.status(200).json({message: 'Obrisano obavestenje'});
  });
});

router.get('/getPredavanja/:predmet/:tip', (req, res, next) => {
  Predavanje.find({predmet: req.params.predmet, tip: req.params.tip})
  .then(result => {
    res.status(200).json({
      sve: result
    })
  });
});

router.delete('/deletePredavanje/:id', (req, res, next) => {
  Predavanje.deleteOne({_id: req.params.id})
  .then(result => {
    console.log('Obrisano predavanje');
    res.status(200).json({message: 'Obrisano predavanje'});
  });
});


module.exports = router;
