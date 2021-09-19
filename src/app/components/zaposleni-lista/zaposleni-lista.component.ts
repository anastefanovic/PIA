import { Component, OnInit } from '@angular/core';
import { Grupa } from 'src/app/models/grupa';
import { Zaposlen } from 'src/app/models/zaposlen';
import { ZaposlenService } from 'src/app/services/zaposlen.service';

@Component({
  selector: 'app-zaposleni-lista',
  templateUrl: './zaposleni-lista.component.html',
  styleUrls: ['./zaposleni-lista.component.css']
})
export class ZaposleniListaComponent implements OnInit {

  zaposleni: Zaposlen[];
  currentUser: string;
  zaposlen: Zaposlen;
  grupe: Grupa[];

  constructor(private servis: ZaposlenService) { }

  ngOnInit(): void {
    this.currentUser = null;
    this.zaposlen = new Zaposlen();
    this.zaposleni = [];
    this.grupe = [];
    this.getZaposleni();
    this.getCurrentUser();
    this.isZaposlen();
  }

  getZaposleni() {
    this.servis.getAllZaposlens().subscribe(
      response => {
        this.zaposleni = response.svi;
      }, err=> {
        console.log('Greska');
      });
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log("Trenutni korisnik: " + this.currentUser);
  }

  isZaposlen() {
    this.servis.getZaposlen(this.currentUser).subscribe(
      response => {
        this.zaposlen = response.zaposlen;
        if(this.zaposlen != null) {
          this.getGrupe();
        }
      });
  }

  getGrupe() {
    this.servis.getAllGrupe().subscribe(
      response => {
        let sve = response.sve;
        let i: number;
        let cap = 0;
        console.log(this.currentUser);
        for(i = 0; i < sve.length; i++) {
          let index = sve[i].nastavnici.findIndex(s => (s == this.currentUser));
          if(index > -1) {
            this.grupe[cap] = sve[i];
            cap++;
          }
        }
      });
  }


}
