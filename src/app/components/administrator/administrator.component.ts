import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TIPOVI_STUDIJA } from 'src/app/data/studije';
import { NASTAVNA_ZVANJA, NENASTAVNA_ZVANJA } from 'src/app/data/zvanja';
import { Grupa } from 'src/app/models/grupa';
import { Predmet } from 'src/app/models/predmet';
import { Raspored } from 'src/app/models/raspored';
import { Student } from 'src/app/models/student';
import { Zaposlen } from 'src/app/models/zaposlen';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { ZaposlenService } from 'src/app/services/zaposlen.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  mode: string;

  //student data:
  student: Student;
  tipovi_studija: string[];
  studentUpdateKorime: string;
  renderStudentUpdate: number;
  updateStudentError: string;
  updateIndeksError: string;
  deletedStudent: string;
  deleteStudentError: string;

  //predmet data
  predmet: Predmet;
  predmetSifra: string;
  deletedPredmet: string;
  deletePredmetError: string;
  predmetNotUniqueError: string;
  predmetNastavniciError: string;
  updatePredmetError: string;
  nastavnici: string;
  renderPredmetUpdate: number;
  semestarError: string;

  //zaposlen data
  nenastavna_zvanja: string[];
  nastavna_zvanja: string[];
  zaposlen: Zaposlen;
  zaposlenKorime: string;
  deleteZaposlenError: string;
  deletedZaposlen: string;
  renderZaposlenUpdate: number;
  zaposlenKorimeError: string;
  zaposlenMobilniError: string;
  updateZaposlenError: string;

  //angazovanja data
  grupa: Grupa;
  raspored: Raspored;
  predmetError: string;
  grupaError: string;
  nastavniciError: string;
  rasporedStudentError: string;
  rasporedPredmetError: string;
  rasporedGrupaError: string;


  constructor(private servis: AdminService,
              private studentServis: StudentService,
              private zaposlenServis:ZaposlenService,
              private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.mode = "";

    this.student = new Student();
    this.tipovi_studija = TIPOVI_STUDIJA;
    this.studentUpdateKorime = "";
    this.renderStudentUpdate = 0;
    this.updateStudentError = "";
    this.deletedStudent = "";
    this.deleteStudentError = "";
    this.updateIndeksError = "";

    this.predmet = new Predmet();
    this.predmetSifra = "";
    this.deletedPredmet = "";
    this.deletePredmetError = "";
    this.predmetNotUniqueError = "";
    this.updatePredmetError = "";
    this.nastavnici = "";
    this.predmetNastavniciError = "";
    this.renderPredmetUpdate = 0;
    this.semestarError = "";

    this.zaposlen = new Zaposlen();
    this.zaposlenKorime = "";
    this.deleteZaposlenError = "";
    this.deletedZaposlen = "";
    this.renderZaposlenUpdate = 0;
    this.zaposlenKorimeError = "";
    this.zaposlenMobilniError = "";
    this.nenastavna_zvanja = NENASTAVNA_ZVANJA;
    this.nastavna_zvanja = NASTAVNA_ZVANJA;
    this.updateZaposlenError = "";

    this.grupa = new Grupa();
    this.raspored = new Raspored();
    this.predmetError = "";
    this.grupaError = "";
    this.nastavniciError = "";
    this.rasporedStudentError = "";
    this.rasporedPredmetError = "";
    this.rasporedGrupaError = "";

  }

  onClick(mode: string) {
    this.initData();
    this.mode = mode;
    console.log(this.mode);

  }

  onLogout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentTip");
    sessionStorage.removeItem("lozinkaChanged");
    this.router.navigate(['/home']);
  }

  //------------------------------------------------ Update student ------------------------------------------------

  findStudent() {
    this.updateStudentError = "";
    this.student = null;
    this.renderStudentUpdate = 0;

    this.servis.getStudent(this.studentUpdateKorime).subscribe(
      response => {
        this.student = response.student;
        console.log(this.student);
        if(this.student == null) {
          this.updateStudentError = 'Student sa trazenim indeksom ne postoji';
        }
        else {
          this.renderStudentUpdate = 1;
        }
      }, error => {
        this.updateStudentError = 'Student sa trazenim indeksom ne postoji';
    });
  }

  onStudentUpdate(form: NgForm) {
    if(form.invalid) {
      return;
    }

    //provera obrasca indeksa
    this.updateIndeksError = "";
    if(this.studentServis.checkIndeks(this.student.indeks) == false) {
      this.updateIndeksError = 'Indeks se mora uneti po sledecem obrascu: GGGG/BBBB';
      return;
    }

    //generisanje korisnickog imena na osnovu prikupljenih licnih podataka
    this.student.korime = this.studentServis.generateKorime(this.student);

    //ako je indeks za dat tip studija jedinstven -> azuriranje
    //inace: greska
   this.servis.getAllStudents().subscribe(
    res => {
      let svi = res.svi;
      console.log(svi);
      if(this.servis.isUnique(svi, this.student)) {
        //nije jedinstven indeks za tip studija
        this.updateIndeksError = "Indeks mora biti jedinstven za trazeni tip studija";
      }
      else {
        //sve ok, azurirati podatke
        this.servis.updateStudent(this.student).subscribe(
          res => {
           console.log(res.message);
           alert('Uspešno ažuriran student');
           form.resetForm();
        });
      }
    }, err => {
      console.log('Greska');
    });
  }

//------------------------------------------------ Delete student ------------------------------------------------

onStudentDelete() {
  this.deletedStudent = ""
  this.deleteStudentError = "";
  this.student = null;

  this.servis.getStudent(this.studentUpdateKorime).subscribe(
      response => {
      this.student = response.student;
      console.log(this.student);
      if(this.student == null) {
        this.deleteStudentError = 'Student sa trazenim indeksom ne postoji';
      }
      else {
        this.servis.deleteStudent(this.studentUpdateKorime);
        alert('Uspešno obrisan student');
      }
  }, error => {
        this.deleteStudentError = 'Student sa traženim indeksom ne postoji';
  });
}
//------------------------------------------------ Insert predmet ------------------------------------------------

onPredmetInsert(form: NgForm) {
  let error = false;
  this.predmetNotUniqueError = "";
  this.predmetNastavniciError = "";
  this.semestarError = "";

  if(form.invalid) {
    return;
  }

  if(!this.servis.checkSemestar(this.predmet.semestar)) {
    this.semestarError = "Semestar mora  biti ceo broj u opsegu 1 - 9";
    error = true;
  }

  this.predmet.nastavnici = this.servis.splitNastavnici(this.nastavnici);

  //provera da li nastavnici postoje u sistemu
  this.servis.getAllZaposlens().subscribe(
    response => {
      let svi = response.svi;
      if(!this.servis.checkZaposleni(svi, this.predmet.nastavnici)) {
        error = true;
        this.predmetNastavniciError = "Ne postoje nastavnici sa imenima koja ste uneli";
      }
    });

  //provera da li je sifra predmeta jedinstvena
  this.servis.getPredmet(this.predmet.sifra).subscribe(
    response => {
      let temp = response.predmet;
      if(temp != null) {
        this.predmetNotUniqueError = "Sifra predmeta mora biti jedinstvena";
        error = true;
      }

      if(!error) {
        this.servis.predmetSignup(this.predmet);
        alert('Uspešno registrovan predmet');
        form.resetForm();
      }
  }, err => {
    console.log('Greska');
  });

}


//------------------------------------------------ Delete predmet ------------------------------------------------


onPredmetDelete() {
  this.deletePredmetError = "";
  this.deletedPredmet = "";

  this.servis.getPredmet(this.predmetSifra).subscribe(
    response => {
      this.predmet = response.predmet;
      if(this.predmet != null) {
        this.servis.deletePredmet(this.predmetSifra);
        alert('Uspešno obrisan predmet');
      }
      else {
        this.deletePredmetError = "Predmet sa traženom šifrom ne postoji";
      }
    });
}

//------------------------------------------------ Update predmet ------------------------------------------------

findPredmet() {
  this.updatePredmetError = "";
  this.renderPredmetUpdate = 0;
  this.predmet = null;

  this.servis.getPredmet(this.predmetSifra).subscribe(
    response => {
      this.predmet = response.predmet;
      if(this.predmet != null) {
        this.renderPredmetUpdate = 1;
        let i;
        this.nastavnici = "";
        for(i = 0; i < this.predmet.nastavnici.length; i++) {
          this.nastavnici = this.nastavnici + this.predmet.nastavnici[i] + ' ';
        }
      }
      else {
        this.updatePredmetError = "Predmet sa traženom šifrom ne postoji";
      }
    });
}

onPredmetUpdate(form: NgForm) {
  let error = false;
  this.predmetNotUniqueError = "";
  this.predmetNastavniciError = "";
  this.semestarError = "";

  if(form.invalid) {
    return;
  }

  if(!this.servis.checkSemestar(this.predmet.semestar)) {
    this.semestarError = "Semestar mora  biti ceo broj u opsegu 1 - 9";
    error = true;
  }

  //generisanje nastavnika
  this.predmet.nastavnici = this.servis.splitNastavnici(this.nastavnici);
  console.log(this.predmet.nastavnici);

  //provera da li nastavnici postoje u sistemu
  this.servis.getAllZaposlens().subscribe(
    response => {
      let svi = response.svi;
      if(!this.servis.checkZaposleni(svi, this.predmet.nastavnici)) {
        error = true;
        this.predmetNastavniciError = "Ne postoje nastavnici sa imenima koja ste uneli";
      }
    });

  //ako je sifra jedinstvena -> azuriranje
  //inace: greska
   this.servis.getAllPredmets().subscribe(
    res => {
      let svi = res.svi;
      if(this.servis.isUniquePredmet(svi, this.predmet)) {
        //nije jedinstvena sifra
        this.predmetNotUniqueError = "Sifra predmeta mora biti jedinstvena";
        error = true;
      }
      if(!error) {
        //sve ok, azurirati podatke
        this.servis.updatePredmet(this.predmet).subscribe(
          res => {
           console.log(res.message);
        });
        alert('Uspešno ažuriran predmet');
        this.renderPredmetUpdate = 0;
      }
    }, err => {
      console.log('Greska');
    });
}

//------------------------------------------------ Delete zaposlen ------------------------------------------------

onZaposlenDelete() {
  this.deleteZaposlenError = "";
  this.deletedZaposlen = "";
  this.zaposlen = null;

  this.servis.getZaposlen(this.zaposlenKorime).subscribe(
    response => {
      this.zaposlen = response.zaposlen;
      if(this.zaposlen != null) {
        this.servis.deleteZaposlen(this.zaposlenKorime);
        alert('Uspešno obrisan zaposlen');
      }
      else {
        this.deleteZaposlenError = "Zaposlen sa traženim korisničkim imenom ne postoji";
      }
    });
}

//------------------------------------------------ Update zaposlen ------------------------------------------------

findZaposlen() {
  this.renderZaposlenUpdate = 0;
  this.zaposlenKorimeError = "";
  this.zaposlenMobilniError = "";
  this.updateZaposlenError = "";
  this.zaposlen = null;

  this.servis.getZaposlen(this.zaposlenKorime).subscribe(
    response => {
      this.zaposlen = response.zaposlen;
      if(this.zaposlen != null) {
        this.renderZaposlenUpdate = 1;
      }
      else {
        this.updateZaposlenError = "Zaposlen sa traženim korisničkim imenom ne postoji";
      }
    });
}

onZaposlenUpdate(form: NgForm) {
  let error = false;

  if(form.invalid) {
    return;
  }

  //provera da li korisnicko ime ima razmak u sebi
  if(this.zaposlenServis.checkKorime(this.zaposlen.korime) == false) {
    this.zaposlenKorimeError = 'Korisnicko ime mora biti jedna rec';
    error = true;
  }
   //provera da li broj sadrzi samo cifre
   if(this.zaposlenServis.checkMobilni(this.zaposlen.mobilni) == false) {
    this.zaposlenMobilniError = 'Broj telefona moze sadrzati samo cifre';
    error = true;
  }
  //provera da li postoji neka greska u podacima pre kreiranja korisnika
  if(error == true) {
    return;
  }

  this.zaposlen.email = this.zaposlenServis.generateEmail(this.zaposlen.korime);

  //ako je korisnicko ime jedinstveno -> azuriranje
  //inace: greska
 this.servis.getAllZaposlens().subscribe(
  res => {
    let svi = res.svi;
    console.log(svi);
    if(this.servis.isUniqueZaposlen(svi, this.zaposlen)) {
      //nije jedinstveno korisnicko ime
      this.zaposlenKorimeError = "Korisničko ime mora biti jedinstveno";
    }
    else {
      //sve ok, azurirati podatke
      this.servis.updateZaposlen(this.zaposlen).subscribe(
        res => {
          alert('Uspešno ažuriran zaposlen');
          form.resetForm();
         console.log(res.message);
      });
    }
  }, err => {
    console.log('Greska');
  });

}

//------------------------------------------------ Ang grupa ------------------------------------------------

onGrupaInsert(form: NgForm) {
  if(form.invalid) {
    return
  }
  this.predmetError = "";
  this.grupaError = "";
  this.nastavniciError = "";
  let error = false;

  //provera formata grupe
  if(!this.servis.checkGrupa(this.grupa.grupa)) {
    this.grupaError = "Oznaka grupe nije u ispravnom formatu";
    error = true;
  }

  //string nastavnici -> niz nastavnici
  this.grupa.nastavnici = this.servis.splitNastavnici(this.nastavnici);

  //provera da li postoji predmet sa datom sifrom
  this.servis.getPredmet(this.grupa.predmet).subscribe(
    response => {
      let p = response.predmet;
      if(p == null) {
        error = true;
        this.predmetError = "Predmet sa unetom sifrom ne postoji";
      }
      else {
        //postoji predmet, dohvati semestar
        this.grupa.semestar = p.semestar;

        //postoji predmet, da li su nastavnici na predmetu
        if(!this.servis.checkNastavnici(p.nastavnici, this.grupa.nastavnici)) {
          this.nastavniciError = "Nastavnici koje ste uneli ne postoje, ili nisu na datom predmetu";
              error = true;
        }
      }

      if(!error) {
        this.servis.grupaSignup(this.grupa);
        alert('Uspešno registrovana grupa za predmet');
        form.resetForm();
      }
    }, err => {
      console.log('Greska');
    });
}

//------------------------------------------------ Ang raspored ------------------------------------------------

onRasporedInsert(form: NgForm) {
  if(form.invalid) {
    return
  }
  this.rasporedStudentError = "";
  this.rasporedPredmetError = "";
  this.rasporedGrupaError = "";
  let error = false;

  //da li postoji student
  this.servis.getStudent(this.raspored.student).subscribe(
    response => {
      this.student = response.student;
      console.log(this.student);
      if(this.student == null) {
        this.rasporedStudentError = 'Traženi student ne postoji';
        error = true;
      }
    }, error => {
      this.rasporedStudentError = 'Traženi student ne postoji';
  });

  //da li postoji grupa sa datim imenom i predmetom
  this.servis.getGrupa(this.raspored.grupa, this.raspored.predmet).subscribe(
    response => {
      this.grupa = response.grupa;
      console.log(this.grupa);
      if(this.grupa == null) {
        this.rasporedGrupaError = 'Tražena grupa ne postoji';
        error = true;
      }
        if(!error) {
          this.servis.rasporedSignup(this.raspored);
          alert('Uspešno registrovan student na grupu');
           form.resetForm();
        }
    }, error => {
      this.rasporedGrupaError = 'Tražena grupa ne postoji';
  });
}
}
