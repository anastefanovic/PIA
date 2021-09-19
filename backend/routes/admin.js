const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const Student = require('../models/student');
const Predmet = require('../models/predmet');
const Zaposlen = require('../models/zaposlen');
const Grupa = require('../models/grupa');
const Raspored = require('../models/raspored');
const Obavestenje = require('../models/obavestenje');


router.post('/login', (req, res, next) => {
  Admin.findOne({korime: req.body.korime, lozinka: req.body.lozinka})
  .then( result => {
    if(!result) {
      console.log('Admin ne postoji');
      return res.status(401).json({
        message: 'Neuspesan login',
        admin: result
      });
    }
    res.status(200).json({
      admin: result
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Neuspesan login'
    });
  });
});

router.post('/signup', (req, res, next) => {
  const admin = new Admin({
    korime: req.body.korime,
    lozinka: req.body.lozinka,
    lozinkaChanged: false
  });
  admin.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacen admin',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/getStudent/:korime', (req, res, next) => {
  Student.findOne({korime: req.params.korime})
  .then(result => {
    console.log('Pronadjen student za admina');
    res.status(200).json({
      student: result
    })
  });
});

router.put('/updateStudent/:id', (req, res, next) => {
  const student = new Student({
    _id: req.body._id,
    ime: req.body.ime,
    prezime: req.body.prezime,
    korime: req.body.korime,
    lozinka: req.body.lozinka,
    indeks: req.body.indeks,
    tipStudija: req.body.tipStudija,
    status: req.body.status,
    lozinkaChanged: req.body.lozinkaChanged
  });
  Student.updateOne({_id: req.params.id}, student)
  .then(result => {
    console.log('Uspesno azuriran student');
    res.status(200).json({
      message: 'Uspesno azuriran student'
    })
  });
});

router.get('/getAllStudents', (req, res, next) => {
  Student.find()
  .then(result => {
    console.log('SVI STUDENTI');
    res.status(200).json({
      svi: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/deleteStudent/:korime', (req, res, next) => {
  Student.deleteOne({korime: req.params.korime})
  .then(result => {
    console.log('Obrisan student');
    res.status(200).json({message: 'Obrisan student'});
  });
});

router.delete('/deletePredmet/:sifra', (req, res, next) => {
  Predmet.deleteOne({sifra: req.params.sifra})
  .then(result => {
    console.log('Obrisan predmet');
    res.status(200).json({message: 'Obrisan predmet'});
  });
});

router.get('/getPredmet/:sifra', (req, res, next) => {
  Predmet.findOne({sifra: req.params.sifra})
  .then(result => {
    console.log('Pronadjen predmet za admina');
    res.status(200).json({
      predmet: result
    })
  });
});

router.post('/insertPredmet', (req, res, next) => {
  const predmet = new Predmet({
    ime: req.body.ime,
    sifra: req.body.sifra,
    tip: req.body.tip,
    espb: req.body.espb,
    cilj: req.body.cilj,
    predavanja: req.body.predavanja,
    vezbe: req.body.vezbe,
    nastavnici: req.body.nastavnici,
    propozicije: req.body.propozicije,
    semestar: req.body.semestar,
    smer: req.body.smer
  });
  predmet.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacen predmet',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/getAllPredmets', (req, res, next) => {
  Predmet.find()
  .then(result => {
    console.log('SVI PREDMETI');
    res.status(200).json({
      svi: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.put('/updatePredmet/:id', (req, res, next) => {
  const predmet = new Predmet({
    _id: req.body._id,
    ime: req.body.ime,
    sifra: req.body.sifra,
    tip: req.body.tip,
    espb: req.body.espb,
    cilj: req.body.cilj,
    predavanja: req.body.predavanja,
    vezbe: req.body.vezbe,
    nastavnici: req.body.nastavnici,
    propozicije: req.body.propozicije,
    semestar: req.body.semestar,
    smer: req.body.smer
  });
  Predmet.updateOne({_id: req.params.id}, predmet)
  .then(result => {
    console.log('Uspesno azuriran predmet');
    res.status(200).json({
      message: 'Uspesno azuriran predmet'
    })
  });
});

router.put('/updateAdmin/:id', (req, res, next) => {
  const admin = new Admin({
    _id: req.body._id,
    korime: req.body.korime,
    lozinka: req.body.lozinka,
    lozinkaChanged: req.body.lozinkaChanged
  });
  Admin.updateOne({_id: req.params.id}, admin)
  .then(result => {
    console.log('Uspesno azuriran admin');
    res.status(200).json({
      message: 'Uspesno azuriran admin'
    })
  });
});

router.delete('/deleteZaposlen/:korime', (req, res, next) => {
  Zaposlen.deleteOne({korime: req.params.korime})
  .then(result => {
    console.log('Obrisan zaposlen');
    res.status(200).json({message: 'Obrisan zaposlen'});
  });
});

router.get('/getZaposlen/:korime', (req, res, next) => {
  Zaposlen.findOne({korime: req.params.korime})
  .then(result => {
    console.log('Pronadjen zaposlen za admina');
    res.status(200).json({
      zaposlen: result
    })
  });
});

router.get('/getAllZaposlens', (req, res, next) => {
  Zaposlen.find()
  .then(result => {
    console.log('SVI ZAPOSLENI');
    res.status(200).json({
      svi: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.put('/updateZaposlen/:id', (req, res, next) => {
  const zaposlen = new Zaposlen({
      _id: req.body._id,
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
      lozinkaChanged: req.body.lozinkaChanged,
      slikaPath: req.body.slikaPath
  });
  Zaposlen.updateOne({_id: req.params.id}, zaposlen)
  .then(result => {
    console.log('Uspesno azuriran zaposlen');
    res.status(200).json({
      message: 'Uspesno azuriran zaposlen'
    })
  });
});

router.post('/insertGrupa', (req, res, next) => {
  const grupa = new Grupa({
    predmet: req.body.predmet,
    grupa: req.body.grupa,
    nastavnici: req.body.nastavnici,
    semestar: req.body.semestar
  });
  grupa.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacena grupa',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/getGrupa/:ime/:predmet', (req, res, next) => {
  Grupa.findOne({grupa: req.params.ime, predmet: req.params.predmet})
  .then(result => {
    console.log('Pronadjena grupa');
    res.status(200).json({
      grupa: result
    })
  });
});

router.post('/insertRaspored', (req, res, next) => {
  const raspored = new Raspored({
    student: req.body.student,
    grupa: req.body.grupa,
    predmet: req.body.predmet
  });
  raspored.save()
  .then(result => {
    res.status(201).json({
      message: 'Uspesno ubacen raspored',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/getAdmin/:korime', (req, res, next) => {
  Admin.findOne({korime: req.params.korime})
  .then(result => {
    console.log(result);
    res.status(200).json({
      admin: result
    })
  });
});

//---------------------------- Obavestenja -------------------------------

router.delete('/deleteObavestenje/:id', (req, res, next) => {
  Obavestenje.deleteOne({_id: req.params.id})
  .then(result => {
    console.log('Obrisano obavestenje');
    res.status(200).json({message: 'Obrisano obavestenje'});
  });
});

router.post('/insertObavestenje', (req, res, next) => {
  const obavestenje = new Obavestenje({
    sadrzaj: req.body.sadrzaj,
    tip: req.body.tip,
    datum: req.body.datum
  });
  obavestenje.save()
  .then(result => {
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

router.get('/getAllObavestenja/:mode', (req, res, next) => {
  Obavestenje.find({tip: req.params.mode})
  .then(result => {
    console.log('SVA OBAVESTENJA');
    res.status(200).json({
      sve: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
