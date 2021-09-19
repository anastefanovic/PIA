import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Predmet, Predmet_obavestenje } from '../models/predmet';
import { Zaposlen } from '../models/zaposlen';
import { DatePipe } from '@angular/common';
import { Predavanje } from '../models/predavanje';
import { Rok } from '../models/rok';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  constructor(private http: HttpClient, public datePipe: DatePipe) { }

  getPredmet(sifra: string) {
    return this.http.get<{ predmet: Predmet}>(
      "http://localhost:3000/api/predmet/info/" + sifra
    );
  }

  getNastavnici() {
    return this.http.get<{ nastavnici: Zaposlen[]}>(
      "http://localhost:3000/api/predmet/nastavnici"
    );
  }

  getObavestenja(sifra: string) {
    return this.http.get<{ obavestenja: Predmet_obavestenje[]}>(
      "http://localhost:3000/api/predmet/obavestenja/" + sifra
    );
  }

  convertDatum(datum: Date): string {
      return this.datePipe.transform(datum, 'dd.MM.yyyy.');
  }

  sortObavestenja(obavestenja: Predmet_obavestenje[]): Predmet_obavestenje[] {
    let i=0; let j = 0;
    for(i = 0; i < obavestenja.length; i++) {
      for(j = i + 1; j < obavestenja.length; j++) {
        if(obavestenja[i].datum < obavestenja[j].datum) {
          let temp = obavestenja[i];
          obavestenja[i] = obavestenja[j];
          let k = j;
          while(k > i + 1) {
            obavestenja[k] = obavestenja[k - 1];
            k--;
          }
          obavestenja[i + 1] = temp;
        }
      }
    }
    return obavestenja;
  }

  getNovaObavestenja(obavestenja: Predmet_obavestenje[]): Predmet_obavestenje[] {
    let i = 0;
    let sevenDays = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime();
    let stop = false;

    console.log(obavestenja);
    console.log(new Date(obavestenja[i].datum).getTime());

    while(obavestenja.length > i && !stop) {
      if(new Date(obavestenja[i].datum).getTime() >= sevenDays) {
        i++;
      }
      else {
        stop = true;
      }
    }

    return obavestenja.splice(0, i);

  }

  getStaraObavestenja(obavestenja: Predmet_obavestenje[]): Predmet_obavestenje[] {
    let i = 0;
    let sevenDays = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime();
    let stop = false;

    while(obavestenja.length > i && !stop) {
      if(new Date(obavestenja[i].datum).getTime() >= sevenDays && i < obavestenja.length) {
        i++;
      }
      else {
        stop = true;
      }
    }

    return obavestenja.splice(i);
  }

  getAllPredmets(smer: string) {
    return this.http.get<{ svi: Predmet[]}>(
      "http://localhost:3000/api/predmet/getAllPredmets/" + smer
    );
  }

  sortPredmeti(predmeti: Predmet[]): Predmet[] {
    let i=0; let j = 0;
    for(i = 0; i < predmeti.length; i++) {
      for(j = i + 1; j < predmeti.length; j++) {
        if(predmeti[i].semestar > predmeti[j].semestar) {
          let temp = predmeti[i];
          predmeti[i] = predmeti[j];
          let k = j;
          while(k > i + 1) {
            predmeti[k] = predmeti[k - 1];
            k--;
          }
          predmeti[i + 1] = temp;
        }
      }
    }
    return predmeti;
  }

  insertObavestenje(pObavestenje: Predmet_obavestenje) {
    return this.http.post("http://localhost:3000/api/predmet/insertObavestenje", pObavestenje);
  }

  checkSemestar(semestar: number): boolean {
    let ok = true;
    let ceo = /^\d+$/;

    ok = ceo.test(semestar.toString());

    if(semestar < 1 || semestar > 9) {
      ok = false;
    }

    return ok;
  }

  splitNastavnici(nastavnici: string): string[] {
    let i = 0, j = 0, index = 0;
    let niz: string[] = [];

    while(i <= nastavnici.length) {
      if(nastavnici[i] == ',' || nastavnici[i] == ' ' || i == nastavnici.length) {
        if(nastavnici.substring(j, i) != '' && nastavnici.substring(j, i) != ' ') {
        niz[index] = nastavnici.substring(j, i);
        index++;
        }
        i++;
        while(nastavnici[i] == ' ') {
          i++;
        }
        j = i;
      }
      else {
        i++
      }
    }

    return niz;
  }

  getAllZaposlens() {
    return this.http.get<{ svi: Zaposlen[] }>(
      "http://localhost:3000/api/admin/getAllZaposlens"
    );
  }

  checkZaposleni(svi: Zaposlen[], input: string[]): boolean {
    let i = 0;
    let ok = true;

    while(i < input.length && ok) {
     let index = svi.findIndex(s => s.korime == input[i]);
     if(index > -1) {
      if(svi[index].tipZvanja == 'Nastavni') {
        i++;
      }
     }
     else {
       ok = false;
     }
    }

    return ok;

  }

  getAllPredmeti() {
    return this.http.get<{ svi: Predmet[] }>(
      "http://localhost:3000/api/admin/getAllPredmets"
    );
  }

  isUniquePredmet(svi: Predmet[], predmet: Predmet) {
    //provera da li je sifra jedinstvena
    let i = 0;
    let found = false;

    while(i < svi.length && !found) {
      if(svi[i].sifra == predmet.sifra && svi[i]._id != predmet._id) {
        found = true;
      }
      else {
        i++;
      }
    }
    return found;
  }

  updatePredmet(predmet: Predmet) {

   return this.http.put<{ message: string }>(
     "http://localhost:3000/api/admin/updatePredmet/" + predmet._id, predmet
   );
 }

 deleteObavestenje(id: string) {
  return this.http.delete("http://localhost:3000/api/predmet/deleteObavestenje/" + id);
 }

 savePredavanje(predmet: string, fajl: File, naziv: string, velicina: string, autor: string, tip: string) {

    const data = new FormData();

    data.append("naziv",  naziv);
    data.append("velicina", velicina);
    data.append("predmet", predmet);
    data.append("autor", autor);
    data.append("tip", tip);
    data.append("fajl", fajl, naziv);

    return this.http.post("http://localhost:3000/api/predmet/savePredavanje", data);
  }

  getAllPredavanja(predmet: string, tip: string) {
    return this.http.get<{ sve: Predavanje[] }>(
      "http://localhost:3000/api/predmet/getPredavanja/" + predmet + "/" + tip
    );
  }

  deletePredavanje(id: string) {
    return this.http.delete("http://localhost:3000/api/predmet/deletePredavanje/" + id);
   }

  getZaposlen(korime: string) {
    return this.http.get<{ sve: Predavanje[] }>(
      "http://localhost:3000/api/predmet/getZaposlen/" + korime
    );
  }

  saveRok(predmet: string, fajl: File, naziv: string, tip: string, datum: Date) {

    const data = new FormData();

    data.append("naziv",  naziv);
    data.append("predmet", predmet);
    data.append("tip", tip);
    data.append("datum", datum.toString());
    data.append("fajl", fajl, naziv);

    return this.http.post("http://localhost:3000/api/rok/saveRok", data);
  }

  getZadaci(predmet: string) {
    return this.http.get<{ sve: Rok[] }>(
      "http://localhost:3000/api/rok/getZadaci/" + predmet
    );
  }

  getResenja(predmet: string) {
    return this.http.get<{ sve: Rok[] }>(
      "http://localhost:3000/api/rok/getResenja/" + predmet
    );
  }


  sortRokovi(rokovi: Rok[]): Rok[] {
    let i=0; let j = 0;
    for(i = 0; i < rokovi.length; i++) {
      for(j = i + 1; j < rokovi.length; j++) {
        if(rokovi[i].datum < rokovi[j].datum) {
          let temp = rokovi[i];
          rokovi[i] = rokovi[j];
          let k = j;
          while(k > i + 1) {
            rokovi[k] = rokovi[k - 1];
            k--;
          }
          rokovi[i + 1] = temp;
        }
      }
    }
    return rokovi;
  }

  deleteRok(id: string) {
    return this.http.delete("http://localhost:3000/api/rok/deleteRok/" + id);
   }

}
