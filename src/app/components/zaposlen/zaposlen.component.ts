import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grupa } from 'src/app/models/grupa';
import { Predmet } from 'src/app/models/predmet';
import { Zaposlen } from 'src/app/models/zaposlen';
import { ZaposlenService } from 'src/app/services/zaposlen.service';

@Component({
  selector: 'app-zaposlen',
  templateUrl: './zaposlen.component.html',
  styleUrls: ['./zaposlen.component.css']
})
export class ZaposlenComponent implements OnInit {

  expand: string;
  zaposlen: Zaposlen;
  korime: string;

  //predmeti
  grupe: Grupa [];
  predmeti: Predmet[];
  semestri: number[];


  constructor(private servis: ZaposlenService,
              private router: Router) { }

  ngOnInit(): void {
    this.grupe = [];
    this.predmeti = [];
    this.semestri = [];
    this.getCurrentUser();
    this.getZaposlen();
    console.log(this.korime);
    this.expand = 'profil';
    for(let i = 0; i < 10; i++) {
      this.semestri[i] = i + 1;
    }

  }

  onClick(mode: string) {
    this.expand = mode;

    if(this.expand == 'predmeti') {
      this.getAngazovanja();
      this.getPredmeti();
    }
  }

  getCurrentUser() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    this.korime = currentUser;
    console.log("Trenutni korisnik: " + currentUser);
  }

  getZaposlen() {
    this.servis.getZaposlen(this.korime).subscribe(
      response => {
        this.zaposlen = response.zaposlen;
        console.log('SLIKA: ' + this.zaposlen.slikaPath);
      });
  }

//---------------------------------------------------- Profil ----------------------------------------------------------

  onZaposlenUpdate(form: NgForm) {
    let error = false;

    if(form.invalid) {
      return;
    }

    this.servis.updateZaposlen(this.zaposlen).subscribe(
      res => {
        alert('Uspešno ažurirani [podaci]');
        console.log(res.message);
        this.expand = 'profil';
    }, err => {
      console.log('Greska');
    });

  }

//---------------------------------------------------- Predmeti ----------------------------------------------------------

getAngazovanja() {
  this.grupe = [];
  this.servis.getAllGrupe().subscribe(
    response => {
      let temp = response.sve;
      for(let i = 0; i < temp.length; i++) {
        if(this.servis.isMojPredmet(temp[i].nastavnici, this.korime)) {
          this.grupe.push(temp[i]);
        }
      }
      for(let i = 0; i < this.grupe.length; i++) {
        console.log(this.grupe[i]);
      }
    });
}

getPredmeti() {
  this.servis.getAllPredmeti().subscribe(
    response => {
      let temp = response.svi;
      for(let i = 0; i < temp.length; i++) {
        if(this.servis.isMojPredmet(temp[i].nastavnici, this.korime)) {
          this.predmeti.push(temp[i]);
        }
      }
    });
  }

    poSemestru(semestar: number) {
      let p = [];
      let cap = 0;
      let i;
      for(i = 0; i < this.predmeti.length; i++) {
        if(this.predmeti[i].semestar == semestar && (this.grupe.findIndex(s => s.predmet == this.predmeti[i].sifra) > -1)) {
          p[cap] = this.predmeti[i];
          cap++;
        }
      }
      return p;
    }

    grupePoSemestru(semestar: number) {
      let temp: Grupa[] = [];
      for(let i = 0; i < this.grupe.length; i++) {
        if(this.grupe[i].semestar == semestar) {
          temp.push(this.grupe[i]);
        }
      }
      return temp;
    }

    termin(sifra: string, tip: string): string {
      let index = this.predmeti.findIndex(p => p.sifra == sifra);
      if(tip[0] == 'V') {
        return this.predmeti[index].vezbe;
      }
      else {
        return this.predmeti[index].predavanja;
      }
    }

    onLogout() {
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentTip");
      sessionStorage.removeItem("lozinkaChanged");
      this.router.navigate(['/home']);
    }
}


