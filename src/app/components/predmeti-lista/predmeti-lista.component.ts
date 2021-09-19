import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Predmet } from 'src/app/models/predmet';
import { PredmetService } from 'src/app/services/predmet.service';

@Component({
  selector: 'app-predmeti-lista',
  templateUrl: './predmeti-lista.component.html',
  styleUrls: ['./predmeti-lista.component.css']
})
export class PredmetiListaComponent implements OnInit {

  smerovi: string[] = ['RTI', 'SI', 'OSTALO', 'MASTER'];
  naslovi: string[] = ['Predmeti na katedri RTI',
                       'Predmeti na katedri SI',
                       'Predmeti katedre RTI na ostalim smerovima',
                       'Predmeti na master studijama'];
  smer: number;
  predmeti: Predmet[];
  semestri: number[];

  constructor(private route: ActivatedRoute,
              private servis: PredmetService) { }

  ngOnInit(): void {
    this.predmeti = [];
    this.semestri = [];
    this.route.params.subscribe(param => {
      this.loadPage(param.smer);
    });
  }

  loadPage(mode: string) {
    this.smer = parseInt(mode);
    console.log(this.smerovi[this.smer]);
    this.loadSemestri();
    this.getPredmeti();
  }

  getPredmeti() {
    this.servis.getAllPredmets(this.smerovi[this.smer]).subscribe(
      response => {
        this.predmeti = this.servis.sortPredmeti(response.svi);
      });
  }

  loadSemestri() {
    let i;
    for(i = 1; i < 11; i++) {
      this.semestri[i-1] = i;
    }
  }

  //izdvajanje niza predmeta za samo dati semestar
  poSemestru(semestar: number) {
    let p = [];
    let cap = 0;
    let i;
    for(i = 0; i < this.predmeti.length; i++) {
      if(this.predmeti[i].semestar == semestar) {
        p[cap] = this.predmeti[i];
        cap++;
      }
    }
    return p;
  }

}
