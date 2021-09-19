import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Predavanje } from 'src/app/models/predavanje';
import { Predmet, Predmet_obavestenje } from 'src/app/models/predmet';
import { Zaposlen } from 'src/app/models/zaposlen';
import { Rok } from 'src/app/models/rok';
import { PredmetService } from 'src/app/services/predmet.service';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit {

  predmet: Predmet = new Predmet();
  nastavnici: Zaposlen[] = [];
  predmetObavestenje: Predmet_obavestenje = new Predmet_obavestenje();
  updateNastavnici: string;

  obavestenjaArray: Predmet_obavestenje[] = [];
  novaObavestenja: Predmet_obavestenje[] = [];
  staraObavestenja: Predmet_obavestenje[] = [];


  info: number;
  obavestenja: number;
  predavanja: number;
  vezbe: number;
  ispiti: number;
  lab: number;
  projekat: number;
  novoObavestenje: number;
  updateInfo: number;

  semestarError: string;
  nastavniciError: string;
  rokError: string;

  //route info
  sifra: string;
  tip: string;
  korime: string;

  //fajlovi
  fajl;
  fajlPreview: string;

  //materijali za predavanja i vezbe
  materijaliP: Predavanje[] = [];
  materijaliV: Predavanje[] = [];

  //materijali za ispite
  zadaci: Rok[] = [];
  resenja: Rok[] = [];
  rok: Rok;


  constructor(public servis: PredmetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.obavestenja = 0;
    this.info = 0;
    this.predavanja = 0;
    this.vezbe = 0;
    this.ispiti = 0;
    this.lab = 0;
    this.projekat = 0;
    this.novoObavestenje = 0;
    this.updateInfo = 0;
    this.semestarError = "";
    this.nastavniciError = "";

    this.getRouteInfo();

    this.servis.getPredmet(this.sifra).subscribe(
      response => {
        console.log(response.predmet.ime);
        this.predmet = response.predmet;
        this.predmetObavestenja();
        this.getNastavnici(this.predmet.nastavnici); });

  }

  getRouteInfo() {
    this.sifra = this.route.snapshot.paramMap.get('sifra');
    console.log(this.sifra);
    this.tip = this.route.snapshot.paramMap.get('tip');
    console.log(this.tip);
    this.korime = this.route.snapshot.paramMap.get('korime');
    console.log(this.korime);
  }

  onClick(page: string) {
    this.info = 0;
    this.predavanja = 0;
    this.vezbe = 0;
    this.ispiti = 0;
    this.lab = 0;
    this.projekat = 0;
    this.obavestenja = 0;
    this.novoObavestenje = 0;
    this.updateInfo = 0;
    this.fajl = null;
    this.rok = new Rok();
    this.rokError = "";

    if(page == "info") {
      this.info = 1;
      this.predmetInfo();
    }
    if(page == "obavestenja") {
      this.obavestenja = 1;
      this.predmetObavestenja();
    }
    if(page == "predavanja") {
      this.predavanja = 1;
      this.fajlPreview = "";
      this.fajl = null;
      this.getPredavanja();
      this.getVezbe();
    }
    if(page == "ispiti") {
      this.ispiti = 1;
      this.fajl = null;
      this.rok = new Rok();
      this.rokError = "";
      this.getZadaci();
      this.getResenja();
    }

    if(page == "lab") {
      this.lab = 1;
    }
    if(page == "projekat") {
      this.projekat = 1;
    }

    if(page == "nazad") {
      if(this.tip == 'zaposlen') {
        this.router.navigate(['/zaposlen']);
      }
      if(this.tip == 'student') {
        this.router.navigate(['/student']);
      }
      }
      if(page == 'novoObavestenje') {
        this.obavestenja = 1;
        this.novoObavestenje = 1;
      }
      if(page == 'updateInfo') {
        this.updateInfo = 1;
        this.info = 0;
        this.semestarError = "";
        this.nastavniciError = "";
        this.generateNastavnici();
      }
  }

  generateNastavnici() {
    this.updateNastavnici = "";
    for(let i = 0; i < this.predmet.nastavnici.length; i++) {
      this.updateNastavnici = this.updateNastavnici + this.predmet.nastavnici[i] + ' ';
    }
  }

  onPredmetUpdate(form: NgForm) {
    let error = false;
    this.semestarError = "";
    this.nastavniciError = "";

    if(form.invalid) {
      return;
    }

    if(!this.servis.checkSemestar(this.predmet.semestar)) {
      this.semestarError = "Semestar mora  biti ceo broj u opsegu 1 - 9";
      error = true;
    }

    //generisanje nastavnika
    this.predmet.nastavnici = this.servis.splitNastavnici(this.updateNastavnici);

    //provera da li nastavnici postoje u sistemu
    this.servis.getAllZaposlens().subscribe(
      response => {
        let svi = response.svi;
        if(!this.servis.checkZaposleni(svi, this.predmet.nastavnici)) {
          error = true;
          this.nastavniciError = "Ne postoje nastavnici sa imenima koja ste uneli";
        }
        if(!error) {
          //sve ok, azurirati podatke
          this.servis.updatePredmet(this.predmet).subscribe(
            res => {
            console.log(res.message);
          });
          alert('Uspešno ažuriran predmet');
          this.predmetInfo();
        }
          }, err => {
            console.log('Greska');
      });

  }

  predmetInfo() {
    this.servis.getPredmet(this.sifra).subscribe(
      response => {
        console.log(response.predmet.ime);
        this.predmet = response.predmet;
        this.getNastavnici(this.predmet.nastavnici);
        this.updateInfo = 0;
        this.info = 1;

      }, error => {
        alert('Greska');
      });

  }

  predmetObavestenja() {
    this.servis.getObavestenja(this.sifra).subscribe(
      response => {
        this.obavestenjaArray = response.obavestenja;
        this.obavestenjaArray = this.servis.sortObavestenja(this.obavestenjaArray);
        if(this.obavestenjaArray.length > 0) {
          this.novaObavestenja = this.servis.getNovaObavestenja(this.obavestenjaArray);
          this.staraObavestenja = this.servis.getStaraObavestenja(this.obavestenjaArray);
        }
        this.obavestenja = 1;
      }, error => {
        alert('Greska');
      });
  }

  findKorime(n: string[], korime: string): boolean {
    let i = 0;
    let found = false;
    while(i < n.length && found == false) {
      if(n[i] == korime) {
        found = true;
      }
      else {
        i++;
      }
    }
    return found;
  }

  //n: korisnicka imena potrebnih nastavnika
  getNastavnici(n: string[]) {
    this.servis.getNastavnici().subscribe(
      response => {
        let svi = response.nastavnici; //svi podaci o svim nastavnicima
        this.nastavnici = svi.filter(svi => this.findKorime(n, svi.korime));
      }, error => {
        alert('Greska');
      });
  }

  convertDatum(datum: Date): string {
    return this.servis.convertDatum(datum);
  }

  test() {
    console.log(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    if(new Date(this.obavestenjaArray[0].datum).getTime() > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime()) {
      console.log('Veci');
    }
    if(new Date(this.obavestenjaArray[0].datum).getTime() < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime()) {
      console.log('Manji');
    }
  }

  onObavestenjeInsert(form: NgForm) {
    if(form.invalid) {
      return
    }
    this.predmetObavestenje.predmet = this.sifra;
    this.servis.insertObavestenje(this.predmetObavestenje).subscribe(
      response => {
        console.log(response);
        this.predmetObavestenja();
        this.novoObavestenje = 0;
      }, err => {
        console.log('Greska');
      });
  }

  obavestenjeDelete(o: Predmet_obavestenje) {
    this.servis.deleteObavestenje(o._id).subscribe(
      response => {
        console.log(response);
        this.predmetObavestenja();
      });
  }


//-------------------------------------------- Predavanja ----------------------------------------------------

onPredavanjePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.fajl = file;
  console.log(this.fajl);
  const reader = new FileReader();
  reader.onload = () => {
    this.fajlPreview = (reader.result as string);
  };
  reader.readAsDataURL(file);

  let velicina = ((file.size)/1000).toString() + 'KB';
  this.servis.savePredavanje(this.sifra, this.fajl, this.fajl.name , velicina, this.korime, 'P').subscribe(
    response => {
      console.log(response);
      this.getPredavanja();
    });
}

onVezbaPicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.fajl = file;
  console.log(this.fajl);
  const reader = new FileReader();
  reader.onload = () => {
    this.fajlPreview = (reader.result as string);
  };
  reader.readAsDataURL(file);

  let velicina = ((file.size)/1000).toString() + 'KB';
  this.servis.savePredavanje(this.sifra, this.fajl, this.fajl.name , velicina, this.korime, 'V').subscribe(
    response => {
      console.log(response);
      this.getVezbe();
    });
}

getPredavanja() {
  this.servis.getAllPredavanja(this.sifra, 'P').subscribe(
    response => {
      this.materijaliP = response.sve;
     //console.log(materijaliP);
    });
}

getVezbe() {
  this.servis.getAllPredavanja(this.sifra, 'V').subscribe(
    response => {
      this.materijaliV = response.sve;
     //console.log(materijaliP);
    });
}

deletePredavanje(p: Predavanje) {
  this.servis.deletePredavanje(p._id).subscribe(
    response => {
      console.log(response);
      if(p.tip == 'P') {
        this.getPredavanja();
      }
      else {
        this.getVezbe();
      }
    });
}

getZaposlen(korime: string) {
  return this.nastavnici.find(n => n.korime == korime);
}

//-------------------------------------------- Ispiti ----------------------------------------------------

onRokPicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.fajl = file;
  console.log(this.fajl);
  const reader = new FileReader();
  reader.onload = () => {
    this.fajlPreview = (reader.result as string);
  };
  reader.readAsDataURL(file);

}

onRokSave(form: NgForm) {
  if(form.invalid || this.fajl == null) {
    this.rokError = "Morate uneti sve podatke";
    return;
  }

  this.servis.saveRok(this.sifra, this.fajl, this.fajl.name, this.rok.tip, this.rok.datum).subscribe(
    response => {
      console.log('Sacuvan rok');
      this.getZadaci();
      this.getResenja();
     // console.log(this.zadaci);
     // console.log(this.resenja);
    });


}

getZadaci() {
  this.servis.getZadaci(this.sifra).subscribe(
    response => {
      let temp = response.sve;
     this.zadaci = this.servis.sortRokovi(temp);
     console.log(this.zadaci);
    });
}

getResenja() {
  this.servis.getResenja(this.sifra).subscribe(
    response => {
      let temp = response.sve;
      this.resenja = this.servis.sortRokovi(temp);
    });
}

deleteRok(r: Rok) {
  this.servis.deleteRok(r._id).subscribe(
    response => {
      console.log(response);
      if(r.tip == 'Z') {
        this.getZadaci();
      }
      else {
        this.getResenja();
      }
    });
}



}
