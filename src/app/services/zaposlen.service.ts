import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat } from 'rxjs';
import { Grupa } from '../models/grupa';
import { Predmet } from '../models/predmet';
import { Zaposlen } from '../models/zaposlen';

@Injectable({providedIn: 'root'})
export class ZaposlenService {

  constructor(private http: HttpClient) { }

  checkMobilni(mobilni: string):boolean {
    let mobilniRegex = /^\d+$/;
    if((mobilniRegex.test(mobilni))==false && mobilni!='' && mobilni!= null) {
      return false;
    }
    return true;
  }

  checkKorime(korime: string):boolean {
    if(korime.indexOf(' ') > -1) {
      return false;
    }
    return true;
  }

  generateEmail(korime: string): string {
    let email = korime + '@etf.bg.ac.rs';
    return email;
  }

  getZaposlen(korime: string) {
    return this.http.get<{ zaposlen: Zaposlen }>(
      "http://localhost:3000/api/zaposlen/getZaposlen/" + korime
    );
  }

  getAllZaposlens() {
    return this.http.get<{ svi: Zaposlen[] }>(
      "http://localhost:3000/api/zaposlen/getAllZaposlens"
    );
  }

  signupZaposlen(zaposlen: Zaposlen) {
    zaposlen.email = this.generateEmail(zaposlen.korime);
    this.http.post("http://localhost:3000/api/zaposlen/signup", zaposlen)
      .subscribe(response => {
        console.log(response);
      });
  }

  signupZaposlenWithImg(zaposlen: Zaposlen, image: File) {
    zaposlen.email = this.generateEmail(zaposlen.korime);

    const data = new FormData();

    data.append("ime", zaposlen.ime);
    data.append("prezime", zaposlen.prezime);
    data.append("korime", zaposlen.korime);
    data.append("lozinka", zaposlen.lozinka);
    data.append("email", zaposlen.email);
    data.append("adresa", zaposlen.adresa);
    data.append("mobilni", zaposlen.mobilni);
    data.append("vebsajt", zaposlen.vebsajt);

    data.append("bio", zaposlen.bio);
    data.append("tipZvanja", zaposlen.tipZvanja);
    data.append("zvanje", zaposlen.zvanje);
    data.append("kabinet", zaposlen.kabinet.toString());
    data.append("status", zaposlen.status);
    data.append("image", image, zaposlen.korime);


    this.http.post("http://localhost:3000/api/zaposlen/signupWithImg", data)
      .subscribe(response => {
        console.log(response);
      });
  }

  saveImage(title: string, image: File) {
    const data = new FormData();
    data.append("image", image, title);

    this.http.post("http://localhost:3000/api/zaposlen/saveImage", data)
      .subscribe(response => {
        console.log(response);
      });
  }

  zaposlenLogin(zaposlen: Zaposlen) {
    return this.http.post("http://localhost:3000/api/zaposlen/login", zaposlen);
  }

  getAllGrupe() {
    return this.http.get<{ sve: Grupa[] }>(
      "http://localhost:3000/api/zaposlen/getAllGrupe"
    );
  }

  updateZaposlen(zaposlen: Zaposlen) {
    return this.http.put<{ message: string }>(
      "http://localhost:3000/api/admin/updateZaposlen/" + zaposlen._id, zaposlen
    );
   }

   getAllPredmeti() {
    return this.http.get<{ svi: Predmet[] }>(
      "http://localhost:3000/api/zaposlen/getAllPredmeti"
    );
  }

  isMojPredmet(nastavnici: string[], korime: string): boolean {
     let index = nastavnici.findIndex(s => s == korime);
     if(index == -1) {
      return false;
     }
     else {
       return true;
     }
  }


}

